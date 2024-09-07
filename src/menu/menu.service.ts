import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMenuDto, MenuFilterType, MenuPaginationResponseType, UpdateMenuDto } from './dto/menu.dto';
import { IUser } from 'interfaces/user.interface';
import { Menu, MenuItem } from '@prisma/client';

@Injectable()
export class MenuService {

    constructor(private prismaService: PrismaService,
    ) { }
    async create(createMenuDto: CreateMenuDto, user: IUser) {
        // Tạo menu mới
        const newMenu = await this.prismaService.menu.create({
            data: {
                name: createMenuDto.name,
                isActive: createMenuDto.isActive ?? true,
                createdBy: user.sub,
            },
        });

        // Nếu có danh sách ID món ăn, thêm các món ăn vào menu
        if (createMenuDto.menuItemIds && createMenuDto.menuItemIds.length > 0) {
            await this.prismaService.menuItem.updateMany({
                where: {
                    id: { in: createMenuDto.menuItemIds },
                },
                data: {
                    menuId: newMenu.id, // Cập nhật menuId của các món ăn
                },
            });
        }

        return newMenu;
    }


    async getAll(filters: MenuFilterType): Promise<MenuPaginationResponseType> {
        const { page = 1, items_per_page = 10, search } = filters;

        // Tính toán số lượng bỏ qua (offset) và số lượng lấy (limit)
        const skip = (page - 1) * items_per_page;
        const take = items_per_page;

        // Lọc các menu theo điều kiện tìm kiếm
        const [menus, total] = await Promise.all([
            this.prismaService.menu.findMany({
                where: {
                    name: {
                        contains: search || '',

                    },
                },
                skip,
                take,
            }),
            this.prismaService.menu.count({
                where: {
                    name: {
                        contains: search || '',

                    },
                },
            }),
        ]);

        return {
            data: menus,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }

    async getDetail(id: number): Promise<Menu & { menuItems: { name: string }[] }> {
        const menu = await this.prismaService.menu.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                updatedBy: true,  
                deletedBy: true,  
                createdBy: true,  
                menuItems: {
                    select: {
                        id:true,
                        name: true,
                    },
                },
            },
        });
    
        if (!menu) {
            throw new NotFoundException(`Không tìm thấy menu với ID ${id}`);
        }
    
        return menu;
    }
    
    
    

    async update(id: number, data: UpdateMenuDto, user: IUser): Promise<Menu> {
        // Kiểm tra xem menu có tồn tại không
        const existingMenu = await this.prismaService.menu.findUnique({
            where: { id },
            include: { menuItems: true },
        });

        if (!existingMenu) {
            throw new NotFoundException(`Menu with ID ${id} not found`);
        }

        // Chuẩn bị dữ liệu để cập nhật
        const updateData: any = {};
        if (data.name !== undefined) updateData.name = data.name;
        updateData.updatedBy = user.sub; // Thêm thông tin về người cập nhật

        // Cập nhật menu
        const updatedMenu = await this.prismaService.menu.update({
            where: { id },
            data: updateData,
        });

        // Cập nhật menuItems nếu có
        if (data.menuItems) {
            // Xóa các món ăn hiện có liên kết với menu
            await this.prismaService.menuItem.updateMany({
                where: { menuId: id },
                data: { menuId: null }, // Xóa liên kết với menu hiện tại
            });

            // Cập nhật các món ăn mới liên kết với menu
            await this.prismaService.menuItem.updateMany({
                where: {
                    id: { in: data.menuItems },
                },
                data: { menuId: id },
            });
        }

        // Truy vấn và trả về menu đã cập nhật cùng với các món ăn của nó
        return this.prismaService.menu.findUnique({
            where: { id },
            include: { menuItems: true },
        });
    }


    async delete(id: number, user: IUser): Promise<void> {
        // Kiểm tra xem menu có tồn tại không
        const existingMenu = await this.prismaService.menu.findUnique({
            where: { id },
        });

        if (!existingMenu) {
            throw new NotFoundException(`Menu with ID ${id} not found`);
        }

        // Cập nhật menu để xóa (chuyển isActive thành false và cập nhật deletedBy)
        await this.prismaService.menu.update({
            where: { id },
            data: {
                isActive: false,
                deletedBy: user.sub, // ID của người xóa
            },
        });
    }

}
