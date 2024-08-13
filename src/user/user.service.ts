
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UserFilterType, UserpaginationResponseType } from './dto/user.dto';
import { hash } from 'bcrypt'; 
import { User } from '@prisma/client'; 
import { contains } from 'class-validator';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }
    async create(body: CreateUserDto): Promise<User> {
        const role = await this.prismaService.role.findUnique({
            where: { id: body.roleId },
        });

        if (!role) {
            throw new HttpException(
                { message: 'Invalid role ID' },
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
                fullName: body.fullName, // Thêm thuộc tính này nếu cần
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



    async getAll(filters: UserFilterType): Promise<UserpaginationResponseType> {
        const items_per_page = Number(filters.items_per_page) || 10;
        const page = Number(filters.page) || 1;  // Sửa thành 1 để bắt đầu từ trang đầu tiên
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
                AND: [
                    { account: { isActive: true } },  // Giả sử bạn muốn lọc theo trạng thái tài khoản
                ],
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                account: {
                    include: {
                        role: true,  // Bao gồm thông tin vai trò của tài khoản
                    },
                },
            },
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
                ],
                AND: [
                    { account: { isActive: true } },  // Giả sử bạn muốn lọc theo trạng thái tài khoản
                ],
            },
        });
    
        return {
            data: users,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }
    
}
