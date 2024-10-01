import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto, UserDto, UserFilterType, UserpaginationResponseType } from './dto/user.dto';
import { hash, compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { IUser } from 'interfaces/user.interface';
import { startOfMonth, endOfMonth, parse } from 'date-fns';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService,
        private cloudinaryService: CloudinaryService,
        private cartService:CartService,
    ) { }

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
                avatar: body.avatar || "https://res.cloudinary.com/dp0daqkme/image/upload/v1725284251/6932514_pxqscj.png",
                role: {
                    connect: {
                        id: body.roleId,
                    },
                },
            },
        });
        if (role.name !== 'ADMIN' && role.name !== 'CUSTOMER') {
            await this.prismaService.employee.create({
                data: {
                    userId: result.id,
                    hireDate: new Date(),
                    salary: 0,
                    position: role.name,
                },
            });
        }
        const { password, ...dataWithoutPassword } = result;

        return dataWithoutPassword;
    }

    async getAll(filters: UserFilterType): Promise<UserpaginationResponseType> {
        const items_per_page = Number(filters.items_per_page) || 4;
        const page = Number(filters.page) || 1;
        const search = filters.search || "";

        const skip = page > 1 ? (page - 1) * items_per_page : 0;

        // Lấy danh sách người dùng với thông tin vai trò
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
                    {
                        username: {
                            contains: search,
                        },
                    },
                    {
                        role: {
                            name: {
                                contains: search,  
                            },
                        },
                    },
                ],
            },
            include: {
                role: true,  // Bao gồm thông tin vai trò
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Chuyển đổi dữ liệu thành UserDto
        const userDtos = users.map(user => {
            const userDto = plainToClass(UserDto, user);
            userDto.roleName = user.role.name;  // Gán tên vai trò vào DTO
            return userDto;
        });

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
                    {
                        username: {
                            contains: search,
                        },
                    },
                    {
                        role: {
                            name: {
                                contains: search,
                            },
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


    async updateAvt(id: number, file: Express.Multer.File): Promise<any> {
        if (!id) {
            throw new BadRequestException('Invalid user ID');
        }

        const user = await this.prismaService.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Upload hình ảnh lên Cloudinary
        const result = await this.cloudinaryService.uploadImage(file);

        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data: { avatar: result.secure_url },
        });

        const { password, ...userData } = updatedUser;

        return userData;
    }


    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }

    async updatePassword(userId: number, newPassword: string): Promise<User> {
        const updatedUser = await this.prismaService.user.update({
            where: { id: userId },
            data: { password: newPassword },
        });

        return updatedUser;

    }

    async getUserWithRole(userId: number) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });

        const role = await this.prismaService.role.findUnique({
            where: { id: user.roleId },
        });

        return {
            ...user,
            roleName: role?.name,
        };
    }
    async getUserWithRoleAndCart(user: IUser) {
        const userWithRole = await this.getUserWithRole(user.sub);
        const cartInfo = await this.cartService.getCart(user);

        return {
            ...userWithRole,
            cart: {
                items: cartInfo.cart.items,
                totalItems: cartInfo.totalItems
            }
        };
    }

    async delete(id: number, user: IUser): Promise<void> {
        const userToDelete = await this.prismaService.user.findUnique({
            where: { id },
            include: { role: true },
        });

        if (!userToDelete) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        if (userToDelete.role.name === 'ADMIN') {
            throw new BadRequestException('Cannot delete users with ADMIN role');
        }

        await this.prismaService.user.update({
            where: { id },
            data: {
                isActive: false,
                updatedAt: new Date(),
            },
        });
    }

    async countNewCustomers(month: number = new Date().getMonth() + 1, year: number = new Date().getFullYear()): Promise<number> {
        const start = startOfMonth(parse(`${year}-${month}-01`, 'yyyy-M-d', new Date()));
        const end = endOfMonth(start);

        const count = await this.prismaService.user.count({
            where: {
                createdAt: {
                    gte: start,
                    lte: end,
                },
                
            },
        });
        return count;
    }
}
