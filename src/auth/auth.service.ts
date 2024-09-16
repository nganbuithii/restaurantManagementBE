import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { RegisterDto } from './dtos/auth.dto';
import { createHash } from 'crypto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private userService: UserService,
        private otpService: OtpService,
        private emailService: EmailService,
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
            const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 là số vòng salt


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
        console.log("ACCOUNT", account)

        if (!account) {
            throw new HttpException(
                { message: 'Account does not exist' },
                HttpStatus.UNAUTHORIZED
            );
        }


        const isPasswordValid = await bcrypt.compare(data.password, account.password);

        if (!isPasswordValid) {
            throw new HttpException(
                { message: 'Invalid password' },
                HttpStatus.UNAUTHORIZED
            );
        }
        // Bước 3: generate access token
        const payload = {

            username: account.username,
            sub: account.id,
            role: account.roleId,
            fullName:account.fullName,
            email:account.email,
            avt:account.avatar            

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


    private async getPermissionsForUser(userId: number): Promise<{ apiPath: string; method: string; module: string }[]> {
        const userWithPermissions = await this.prismaService.user.findUnique({
            where: { id: userId },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });
    
        // Trả về danh sách các quyền, mỗi quyền chứa apiPath, method, và module
        return userWithPermissions.role.permissions.map(rp => ({
            apiPath: rp.permission.apiPath,
            method: rp.permission.method,
            module: rp.permission.module,
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


    async sendPasswordResetOTP(email: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const otp = this.otpService.generateOTP();
        this.otpService.storeOTP(email, otp);
        await this.emailService.sendOTP(email, otp);

        return { message: 'OTP sent to your email' };
    }



    async resetPassword(email: string, otp: string, newPassword: string) {
        // Kiểm tra OTP
        const isValidOTP = this.otpService.verifyOTP(email, otp);
        if (!isValidOTP) {
            throw new BadRequestException('Invalid or expired OTP');
        }

        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Hash và cập nhật mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userService.updatePassword(user.id, hashedPassword);

        // Xóa OTP sau khi sử dụng
        this.otpService.clearOTP(email);

        return { message: 'Password reset successfully' };
    }
}    