import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMenuDto, MenuFilterType, MenuPaginationResponseType } from './dto/menu.dto';
import { IUser } from 'interfaces/user.interface';

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
}
