import { Injectable, NotFoundException } from '@nestjs/common';
import { isValidStatus } from 'constants/status.constants';
import { CreateIngredientDto, IngredientFilterType, IngredientPaginationResponseType, UpdateIngredientDto } from './dto/ingredient.dto';
import { PrismaService } from 'src/prisma.service';
import { Ingredient } from '@prisma/client';
import { IUser } from 'interfaces/user.interface';

@Injectable()
export class IngredientService {
    constructor(private prismaService: PrismaService,

    ) { }
    async create(body: CreateIngredientDto, user: IUser) {
        const { name, unit, productDate, price, status, quantity } = body;

        const formattedProductDate = new Date(productDate).toISOString();

        return await this.prismaService.$transaction(async (prisma) => {
            const ingredient = await prisma.ingredient.create({
                data: {
                    name,
                    unit,
                    productDate: formattedProductDate,
                    price,
                    status,
                    createdBy: user.sub
                },
            });

            await prisma.inventory.create({
                data: {
                    ingredientId: ingredient.id,
                    quantity,
                    lastChecked: new Date()
                }
            });

            return ingredient;
        });
    }

    validateStatus(status: string): boolean {
        return isValidStatus(status);
    }

    async getAll(filters: IngredientFilterType): Promise<IngredientPaginationResponseType> {
        const items_per_page = Number(filters.items_per_page) || 4;
        const page = Number(filters.page) || 1;
        const search = filters.search || "";
        const sort = filters.sort;

        const skip = page > 1 ? (page - 1) * items_per_page : 0;
        let orderBy: any = {
            createdAt: "desc",
        };
        if (sort === 'price_asc') {
            orderBy = {
                price: 'asc',
            };
        } else if (sort === 'price_desc') {
            orderBy = {
                price: 'desc',
            };
        }
        const ingredients = await this.prismaService.ingredient.findMany({
            take: items_per_page,
            skip,
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        unit: {
                            contains: search,
                        },
                    },
                ],
                isActive: filters.isActive === undefined ? undefined : filters.isActive === 'true',
            },
            orderBy: orderBy,
        });

        const total = await this.prismaService.ingredient.count({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        unit: {
                            contains: search,
                        },
                    },
                ],
                isActive: filters.isActive === undefined ? undefined : filters.isActive === 'true',
            },
        });

        return {
            data: ingredients,
            total,
            currentPage: page,
            itemsPerPage: items_per_page,
        };
    }

    async getDetail(id: number) {
        const ingredient = await this.prismaService.ingredient.findUnique({
            where: { id },
        });

        if (!ingredient) {
            throw new NotFoundException(`Ingredient with id ${id} not found`);
        }

        return ingredient;
    }


    async update(id: number, data: UpdateIngredientDto, user: IUser): Promise<Ingredient> {

        const ingredient = await this.prismaService.ingredient.findUnique({
            where: { id },
        });

        if (!ingredient) {
            throw new NotFoundException(`Ingredient with id ${id} not found`);
        }

        return this.prismaService.ingredient.update({
            where: { id },
            data: {
                ...data,
                updatedBy: user.sub,
                updatedAt: new Date(),
            },
        });
    }

    async delete(id: number, user: IUser): Promise<Ingredient> {
        const ingredient = await this.prismaService.ingredient.update({
            where: { id },
            data: { isActive: false, deletedBy: user.sub, },
        });
        return ingredient;
    }
}