import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMenuItemDto } from './dto/menu-item.dto';
import { IUser } from 'interfaces/user.interface';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

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
    
    
    
}
