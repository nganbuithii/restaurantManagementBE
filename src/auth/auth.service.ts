import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { RegisterDto } from './dtos/auth.dto';
import { createHash } from 'crypto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { compare } from 'bcrypt';
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
            const existingAccount = await this.prismaService.account.findUnique({
                where: { username: userData.username },
            });

            if (existingAccount) {
                throw new HttpException(
                    { message: 'This username has been used' },
                    HttpStatus.BAD_REQUEST
                );
            }
            // Bước 1: Kiểm tra email đã tồn tại chưa
            const existingUser = await prisma.user.findUnique({
                where: { email: userData.email },
            });

            if (existingUser) {
                throw new HttpException(
                    { message: 'This email has been used' },
                    HttpStatus.BAD_REQUEST
                );
            }

            // Bước 2: Băm mật khẩu
            const hashedPassword = createHash('sha256').update(userData.password).digest('hex');

            // Bước 3: Tạo hoặc lấy role mặc định
            const defaultRole = await prisma.role.upsert({
                where: { name: 'NORMAL_USER' },
                update: {},
                create: { name: 'NORMAL_USER' },
            });

            // Bước 4: Tạo tài khoản mới
            const newAccount = await prisma.account.create({
                data: {
                    username: userData.username,
                    password: hashedPassword,
                    role: { connect: { id: defaultRole.id } },
                },
            });

            // Bước 5: Tạo người dùng mới và liên kết với tài khoản
            const newUser = await prisma.user.create({
                data: {
                    fullName: userData.fullName,
                    email: userData.email,
                    phone: userData.phone || null,
                    account: { connect: { id: newAccount.id } }, // Kết nối tài khoản
                },
            });


            return newUser;
        });
    };

    login = async (data: { username: string, password: string }): Promise<any> => {
        // Kiểm tra tài khoản có tồn tại không
        const account = await this.prismaService.account.findUnique({
            where: { username: data.username },
        });

        if (!account) {
            throw new HttpException(
                { message: 'Account does not exist' },
                HttpStatus.UNAUTHORIZED
            );
        }

        // So sánh mật khẩu đã băm

        if (account.password !== account.password) {
            throw new HttpException(
                { message: 'Invalid password' },
                HttpStatus.UNAUTHORIZED
            );
        }
        // Bước 3: generate access token
        const payload = { 
           
            username: account.username ,
            sub:account.id
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

    async validateUser(username: string, pass: string): Promise<any> {
        // check xem người dùng đăng nhập có hợp lệ không
        const user = await this.userService.findOne(username);
        
        
        if(user){
            const isValid = this.userService.isValidPassword(pass, user.password)
            if(isValid){
                return user;
            }
        }
        return null;
    }
}
