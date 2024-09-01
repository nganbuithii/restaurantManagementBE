import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InventoryFilterType, InventoryPaginationResponseType } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
    constructor(private prismaService: PrismaService) { }

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
            }),
            this.prismaService.inventory.count({ where }),
        ]);

        return {
            data: inventoryItems,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }
}
