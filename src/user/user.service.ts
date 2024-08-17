import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto, UserDto, UserFilterType, UserpaginationResponseType } from './dto/user.dto';
import { hash, compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async create(body: CreateUserDto): Promise<Omit<User, 'password'>> {
        const role = await this.prismaService.role.findUnique({
            where: { id: body.roleId },
        });

        if (!role || !role.isActive) {
            throw new HttpException(
                { message: 'Invalid or inactive role ID' },
                HttpStatus.BAD_REQUEST
            );
        }

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
        const existingAccount = await this.prismaService.user.findUnique({
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
                phone: body.phone,
                fullName: body.fullName,
                username: body.username,
                password: hashedPassword,
                avatar: body.avatar || "",
                role: {
                    connect: {
                        id: body.roleId,
                    },
                },
            },
        });

        const { password, ...dataWithoutPassword } = result;

        return dataWithoutPassword;
    }

    async getAll(filters: UserFilterType): Promise<UserpaginationResponseType> {
        const items_per_page = Number(filters.items_per_page) || 10;
        const page = Number(filters.page) || 1;
        const search = filters.search || "";

        const skip = page > 1 ? (page - 1) * items_per_page : 0;
        const users = await this.prismaService.user.findMany({
            take: items_per_page,
            skip,
            where: {
                OR: [
                    {
                        fullName: {
                            contains: search,
                        },
                    },
                    {
                        email: {
                            contains: search,
                        },
                    },
                ],
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Chuyển đổi dữ liệu thành UserDto
        const userDtos = users.map(user => plainToClass(UserDto, user));

        // Tính tổng số người dùng
        const total = await this.prismaService.user.count({
            where: {
                OR: [
                    {
                        fullName: {
                            contains: search,
                        },
                    },
                    {
                        email: {
                            contains: search,
                        },
                    },
                ],
            },
        });

        return {
            data: userDtos,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }

    async getDetail(id: number): Promise<Omit<User, 'password'>> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Loại bỏ thuộc tính password
        const { password, ...userData } = user;

        return userData;
    }

    async update(id: number, data: UpdateUserDto): Promise<User> {
        // Xử lý dữ liệu cập nhật
        const updateData: any = { ...data };



        return await this.prismaService.user.update({
            where: {
                id
            },
            data: updateData,
        });
    }


    async getMe() {
        return "hiii";
    }

    async findOne(username: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }

        return user;
    }

    async isValidPassword(password: string, hash: string) {
        return compareSync(password, hash);
    }
}
