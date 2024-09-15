import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InventoryFilterType, InventoryPaginationResponseType } from './dto/inventory.dto';
import { EmailService } from 'src/email/email.service';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class InventoryService {
    constructor(private prismaService: PrismaService, private emailService: EmailService) { }

    async getAll(params: InventoryFilterType): Promise<InventoryPaginationResponseType> {
        const { page = parseInt(process.env.DEFAULT_PAGE, 10) || 1, items_per_page = parseInt(process.env.ITEMS_PER_PAGE, 10) || 10, search } = params;
        const skip = (page - 1) * items_per_page;

        const where: any = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};

        const [inventoryItems, total] = await Promise.all([
            this.prismaService.inventory.findMany({
                where,
                skip,
                take: items_per_page,
                include: {
                    ingredient: {
                        select: { name: true }, // Chỉ lấy name của ingredient
                    },
                },
            }),
            this.prismaService.inventory.count({ where }),
        ]);

        return {
            data: inventoryItems.map(item => ({
                ...item,
                ingredientName: item.ingredient?.name, // Gắn thêm name của ingredient vào item
            })),
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }

    @Cron(CronExpression.EVERY_5_HOURS)
    async checkInventoryLevels() {
        const inventoryItems = await this.prismaService.inventory.findMany({
            include: {
                ingredient: true,
            },
        });

        const lowStockItems = inventoryItems.filter(item => {
            const ingredient = item.ingredient;
            // console.log("ingredient", ingredient)
            return ingredient && ingredient.minThreshold !== null && item.quantity < ingredient.minThreshold;
        });

        if (lowStockItems.length > 0) {
            const emailContent = lowStockItems.map(item => `
                Ingredients:  ${item.ingredient.name}
                Current quantity:  ${item.quantity}
                 Minimum Threshold:  ${item.ingredient.minThreshold}
            `).join('\n\n');

            await this.emailService.sendEmail(
                '',
                'Low Inventory Warning',
                `The following ingredients are below the minimum threshold:\n\n${emailContent}`
            );
        } else {
            await this.emailService.sendEmail(
                '',
                'Notification of Adequate Stock of Raw Materials',
                'Currently your inventory still has enough materials and no materials are below the minimum threshold.'
            );
        }
    }


}
