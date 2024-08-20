import { Injectable, NotFoundException } from '@nestjs/common';
import { isValidStatus } from 'constants/status.constants';
import { CreateIngredientDto, IngredientFilterType, IngredientPaginationResponseType, UpdateIngredientDto } from './dto/ingredient.dto';
import { PrismaService } from 'src/prisma.service';
import { UserHelper } from 'helper/user.helper';
import { plainToClass } from 'class-transformer';
import { Ingredient } from '@prisma/client';
import { IUser } from 'interfaces/user.interface';

@Injectable()
export class IngredientService {
    constructor(private prismaService: PrismaService,
        private userHelper: UserHelper
    ) { }
    async create(body: CreateIngredientDto, userId: number) {
        const { name, unit, productDate, price, status } = body;

        const formattedProductDate = new Date(productDate).toISOString();

        // Lấy employeeId từ userId
        const employeeId = await this.userHelper.getEmployeeIdByUserId(userId);

        return await this.prismaService.ingredient.create({
            data: {
                name,
                unit,
                productDate: formattedProductDate,
                price,
                status,
                employeeId, // Lưu employeeId vào bảng Ingredient
            },
        });
    }

    validateStatus(status: string): boolean {
        return isValidStatus(status);
    }

    async getAll(filters: IngredientFilterType): Promise<IngredientPaginationResponseType> {
        const items_per_page = Number(filters.items_per_page) || 10;
        const page = Number(filters.page) || 1;
        const search = filters.search || "";

        const skip = page > 1 ? (page - 1) * items_per_page : 0;
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
            orderBy: {
                createdAt: "desc",
            },
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
    
    async delete(id: number, user:IUser): Promise<Ingredient> {
        const ingredient = await this.prismaService.ingredient.update({
            where: { id },
            data: { isActive: false, deletedBy:user.sub,  },
        });
        return ingredient;
    }
}