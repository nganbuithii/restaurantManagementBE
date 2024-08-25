import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWarehouseSlipDto, WarehouserSlipFilterType, WarehouseSlipPaginationResponseType } from './dto/warehouse-slip.dto';
import { IUser } from 'interfaces/user.interface';
import { WarehouseSlip } from '@prisma/client';

@Injectable()
export class WarehouseSlipsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(body: CreateWarehouseSlipDto, user: IUser): Promise<WarehouseSlip> {
        // Kiểm tra sự tồn tại của nhà cung cấp và nhân viên
        const supplier = await Promise.all([
            this.prisma.supplier.findUnique({ where: { id: body.supplierId } }),
        ]);

        if (!supplier) throw new BadRequestException('Supplier not found');

        // Kiểm tra sự tồn tại của tất cả nguyên liệu và lượng tồn kho
        const ingredientIds = body.details.map(detail => detail.ingredientId);
        const ingredients = await this.prisma.ingredient.findMany({
            where: { id: { in: ingredientIds } },
            include: { inventory: true }
        });

        if (ingredients.length !== ingredientIds.length) {
            throw new BadRequestException('One or more ingredients not found');
        }

        // Kiểm tra số lượng tồn kho cho phiếu xuất
        if (body.type === 'OUT') {
            for (const detail of body.details) {
                const ingredient = ingredients.find(i => i.id === detail.ingredientId);
                if (!ingredient.inventory || detail.quantity > ingredient.inventory.quantity) {
                    throw new BadRequestException(`Insufficient inventory for Ingredient ID ${detail.ingredientId}`);
                }
            }
        }

        // Tạo mới phiếu kho trong cơ sở dữ liệu
        const warehouseSlip = await this.prisma.warehouseSlip.create({
            data: {
                type: body.type,
                employeeId: body.employeeId,
                supplierId: body.supplierId,
                details: {
                    create: body.details.map(detail => ({
                        quantity: detail.quantity,
                        ingredientId: detail.ingredientId,
                    })),
                },
            },
            include: { details: true },
        });

        // Cập nhật lượng tồn kho
        if (body.type === 'OUT') {
            await Promise.all(body.details.map(detail =>
                this.prisma.inventory.update({
                    where: { ingredientId: detail.ingredientId },
                    data: { quantity: { decrement: detail.quantity } },
                })
            ));
        } else if (body.type === 'IN') {
            await Promise.all(body.details.map(detail =>
                this.prisma.inventory.upsert({
                    where: { ingredientId: detail.ingredientId },
                    update: { quantity: { increment: detail.quantity } },
                    create: { ingredientId: detail.ingredientId, quantity: detail.quantity, lastChecked: new Date() },
                })
            ));
        }

        return warehouseSlip;
    }

    async getAll(filter: WarehouserSlipFilterType): Promise<WarehouseSlipPaginationResponseType> {
        const itemsPerPage = parseInt(process.env.ITEMS_PER_PAGE, 10) || 10;
        const currentPage = parseInt(process.env.DEFAULT_PAGE, 10) || 1;
        
        const search = filter.search || '';
        const page = filter.page || currentPage;
        const perPage = filter.items_per_page || itemsPerPage;

        const warehouseSlips = await this.prisma.warehouseSlip.findMany({
            where: {
                type: {
                    contains: search,
                },
            },
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
                details: true,
            },
        });

        const total = await this.prisma.warehouseSlip.count({
            where: {
                type: {
                    contains: search,
                },
            },
        });

        return {
            data: warehouseSlips,
            total,
            currentPage: page,
            itemsPerPage: perPage,
        };
    }

    async getById(id: number): Promise<WarehouseSlip> {
        const warehouseSlip = await this.prisma.warehouseSlip.findUnique({
            where: { id },
            include: {
                details: true, 
            },
        });

        if (!warehouseSlip) {
            throw new NotFoundException(`WarehouseSlip with ID ${id} not found`);
        }

        return warehouseSlip;
    }


    async delete(id: number, user: IUser): Promise<void> {
        const warehouseSlip = await this.prisma.warehouseSlip.findUnique({
            where: { id },
        });

        if (!warehouseSlip) {
            throw new NotFoundException(`WarehouseSlip with ID ${id} not found`);
        }

        await this.prisma.warehouseSlip.update({
            where: { id },
            data: {

            },
        });
    }
}
