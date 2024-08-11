import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { RegisterDto } from './dtos/auth.dto';
import { createHash } from 'crypto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService
    ) { }

    register = async (userData: RegisterDto): Promise<User> => {
        return this.prismaService.$transaction(async (prisma) => {
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
                    email: userData.email,
                    phone: userData.phone || null,
                    accountId: newAccount.id,
                },
            });
    
            return newUser;
        });
    };
}
