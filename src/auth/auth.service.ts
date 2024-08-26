import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { RegisterDto } from './dtos/auth.dto';
import { createHash } from 'crypto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    register = async (userData: RegisterDto): Promise<User> => {
        return this.prismaService.$transaction(async (prisma) => {
            // Bước 1: Kiểm tra tên người dùng đã tồn tại chưa
            const existingAccount = await prisma.user.findUnique({
                where: { username: userData.username },
            });

            if (existingAccount) {
                throw new HttpException(
                    { message: 'This username has been used' },
                    HttpStatus.BAD_REQUEST
                );
            }

            // Bước 2: Kiểm tra email đã tồn tại chưa
            const existingUser = await prisma.user.findUnique({
                where: { email: userData.email },
            });

            if (existingUser) {
                throw new HttpException(
                    { message: 'This email has been used' },
                    HttpStatus.BAD_REQUEST
                );
            }

            // Bước 3: Băm mật khẩu
            const hashedPassword = createHash('sha256').update(userData.password).digest('hex');

             // Lấy role 'CUSTOMER'
        const customerRole = await prisma.role.upsert({
            where: { name: 'CUSTOMER' },
            update: {},
            create: { name: 'CUSTOMER' },
        });

        // Tạo người dùng mới và liên kết với role 'CUSTOMER'
        const newUser = await prisma.user.create({
            data: {
                fullName: userData.fullName,
                email: userData.email,
                phone: userData.phone || null,
                username: userData.username,
                password: hashedPassword,
                role: {
                    connect: { id: customerRole.id },
                },
                avatar: userData.avatar || '',
            },
        });
        // Bước 5: Nếu role là CUSTOMER, thêm thông tin vào bảng CUSTOMER
        if (customerRole.name === 'CUSTOMER') {
            await prisma.customer.create({
                data: {
                    userId: newUser.id,
                
                },
            });
        }
        

        return newUser;
    });
    };


    login = async (data: { username: string, password: string }): Promise<any> => {
        // Kiểm tra tài khoản có tồn tại không
        const account = await this.prismaService.user.findUnique({
            where: { username: data.username },
        });

        if (!account) {
            throw new HttpException(
                { message: 'Account does not exist' },
                HttpStatus.UNAUTHORIZED
            );
        }


        const hashedInputPassword = await bcrypt.hash(data.password, account.password);

        // So sánh mật khẩu đã băm với mật khẩu lưu trữ trong cơ sở dữ liệu
        if (hashedInputPassword !== account.password) {
            throw new HttpException(
                { message: 'Invalid password' },
                HttpStatus.UNAUTHORIZED
            );
        }
        // Bước 3: generate access token
        const payload = {

            username: account.username,
            sub: account.id,
            role: account.roleId

        }
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h'
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '7d'
        });



        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    };


    private async getPermissionsForUser(userId: number): Promise<{ action: string; resource: string }[]> {
        const userWithPermissions = await this.prismaService.user.findUnique({
            where: { id: userId },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true
                            }
                        }
                    }
                }
            }
        });

        // Trả về danh sách các quyền, mỗi quyền chứa action và resource
        return userWithPermissions.role.permissions.map(rp => ({
            action: rp.permission.action,
            resource: rp.permission.resource
        }));
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;

            // Lấy permissions từ database
            const permissions = await this.getPermissionsForUser(user.id);

            // Trả về đối tượng kết quả với các permissions
            return { ...result, permissions };
        }
        return null;
    }
}    