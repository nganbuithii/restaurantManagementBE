
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt'; 
import { User } from '@prisma/client'; 

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async create(body: CreateUserDto): Promise<User> {
        // Bước 1: Kiểm tra xem email đã tồn tại hay chưa
        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (existingUser) {
            throw new HttpException(
                { message: 'This email is already in use' },
                HttpStatus.BAD_REQUEST,
            );
        }

        // Bước 2: Kiểm tra xem username đã tồn tại hay chưa
        const existingAccount = await this.prismaService.account.findUnique({
            where: {
                username: body.username,
            },
        });

        if (existingAccount) {
            throw new HttpException(
                { message: 'This username has been used' },
                HttpStatus.BAD_REQUEST,
            );
        }

        // Bước 3: Băm mật khẩu
        const hashedPassword = await hash(body.password, 10);

        // Bước 4: Tạo tài khoản và người dùng đồng thời
        const result = await this.prismaService.user.create({
            data: {
                email: body.email,
                phone: body.phone, // Có thể để undefined nếu không có giá trị
                account: {
                    create: {
                        username: body.username,
                        password: hashedPassword, // Sử dụng password đã băm
                        role: {
                            connect: {
                                id: body.roleId, // Truyền id hợp lệ của role
                            },
                        },
                    },
                },
            },
            include: {
                account: true,
            },
        });

        return result;
    }
}
