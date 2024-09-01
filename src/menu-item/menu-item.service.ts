import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMenuItemDto, MenuItemFilterType, MenuItemPaginationResponseType, UpdateMenuItemDto } from './dto/menu-item.dto';
import { IUser } from 'interfaces/user.interface';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MenuItem } from '@prisma/client';

@Injectable()
export class MenuItemService {
    constructor(private prismaService: PrismaService,
        private cloudinaryService: CloudinaryService
    ) { }
    async create(body: CreateMenuItemDto, user: IUser, files: Array<Express.Multer.File>) {
        const { name, price, ingredientQuantities } = body;
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

        // Kiểm tra nếu không có hình ảnh
        if (!files || files.length === 0) {
            throw new BadRequestException('At least one image is required.');
        }

        // Phân tích cú pháp ingredientQuantities nếu nó là chuỗi JSON
        let parsedIngredientQuantities;
        try {
            parsedIngredientQuantities = typeof ingredientQuantities === 'string'
                ? JSON.parse(ingredientQuantities)
                : ingredientQuantities;
        } catch (e) {
            throw new BadRequestException('Invalid format for ingredientQuantities.');
        }

        // Upload images to Cloudinary
        const uploadedImages = await this.cloudinaryService.uploadImages(files);

        // Create menu item with images and ingredients
        const menuItem = await this.prismaService.menuItem.create({
            data: {
                name,
                price: numericPrice,
                createdBy: user.sub,
                images: {
                    create: uploadedImages.map(image => ({
                        url: image.secure_url
                    })),
                },
                ingredients: {
                    create: parsedIngredientQuantities.map(item => ({
                        ingredient: {
                            connect: { id: item.ingredientId },
                        },
                        quantity: item.quantity,
                    })),
                },
            },
        });

        return menuItem;
    }


    async getAll(filter: MenuItemFilterType): Promise<MenuItemPaginationResponseType> {
        const items_per_page = Number(process.env.ITEMS_PER_PAGE) ; 
        const page = Number(filter.page) || 1;
        const search = filter.search || "";

        const skip = (page - 1) * items_per_page;
        const take = items_per_page;

        const where = search ? { name: { contains: search } } : {};

        // Lấy danh sách menu items với phân trang và lọc
        const [menuItems, total] = await this.prismaService.$transaction([
            this.prismaService.menuItem.findMany({
                where,
                skip,
                take,
                include: {
                    images: true,
                    ingredients: true,
                },
            }),
            this.prismaService.menuItem.count({ where }),
        ]);

        return {
            data: menuItems,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }

    async getDetail(id: number): Promise<MenuItem> {
        const menuItem = await this.prismaService.menuItem.findUnique({
            where: { id },
            include: {
                images: true,
                ingredients: true,

            },
        });

        if (!menuItem) {
            throw new NotFoundException(`Menu item with id ${id} not found`);
        }

        return menuItem;
    }
    async update(id: number, data: UpdateMenuItemDto, user: IUser): Promise<MenuItem> {
        // Kiểm tra xem mục menu có tồn tại không
        const existingMenuItem = await this.prismaService.menuItem.findUnique({
            where: { id },
            include: { ingredients: true },
        });

        if (!existingMenuItem) {
            throw new NotFoundException(`Không tìm thấy mục menu với ID ${id}`);
        }

        // Chuẩn bị dữ liệu để cập nhật
        const updateData: any = {
            updatedBy: user.sub,
            updatedAt: new Date(),
        };
        if (data.name !== undefined) updateData.name = data.name;
        if (data.price !== undefined) updateData.price = data.price;

        // Cập nhật mục menu
        const updatedMenuItem = await this.prismaService.menuItem.update({
            where: { id },
            data: updateData,
        });

        // Chỉ cập nhật nguyên liệu nếu được cung cấp
        if (data.ingredientQuantities && data.ingredientQuantities.length > 0) {
            // Xóa các mối quan hệ hiện có
            await this.prismaService.menuItemIngredient.deleteMany({
                where: { menuItemId: id },
            });

            // Tạo các mối quan hệ mới
            await this.prismaService.menuItemIngredient.createMany({
                data: data.ingredientQuantities.map(iq => ({
                    menuItemId: id,
                    ingredientId: iq.ingredientId,
                    quantity: iq.quantity,
                })),
            });
        }

        // Truy vấn và trả về mục menu đã được cập nhật cùng với các nguyên liệu của nó
        return this.prismaService.menuItem.findUnique({
            where: { id },
            include: { ingredients: true },
        });
    }


    async delete(id: number, user: IUser): Promise<void> {
        // Kiểm tra xem mục menu có tồn tại không
        const existingMenuItem = await this.prismaService.menuItem.findUnique({
            where: { id },
        });

        if (!existingMenuItem) {
            throw new NotFoundException(`Không tìm thấy mục menu với ID ${id}`);
        }

        // Cập nhật mục menu: đặt isActive = false và cập nhật deletedBy
        await this.prismaService.menuItem.update({
            where: { id },
            data: {
                isActive: false,
                deletedBy: user.sub,

            },
        });

        // Không trả về dữ liệu
    }
}    