import { Injectable, NotFoundException } from '@nestjs/common';
import { isValidStatus } from 'constants/status.constants';
import { CreateIngredientDto } from './dto/ingredient.dto';
import { PrismaService } from 'src/prisma.service';
import { UserHelper } from 'helper/user.helper';

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
}
