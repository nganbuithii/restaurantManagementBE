import { Injectable } from '@nestjs/common';
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
        const { name, price } = body;
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
        // Upload images to Cloudinary
        const uploadedImages = await this.cloudinaryService.uploadImages(files);
    
        // Create menu item with images
        const menuItem = await this.prismaService.menuItem.create({
            data: {
                name,
                price:numericPrice,
                createdBy: user.sub,
                images: {
                    create: uploadedImages.map(image => ({
                        url: image.secure_url
                    })),
                },
            },
        });
    
        return menuItem;
    }
    
}
