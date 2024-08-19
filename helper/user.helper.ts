
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserHelper {
    constructor(private prismaService: PrismaService) {}

    async getEmployeeIdByUserId(userId: number): Promise<number> {
        const employee = await this.prismaService.employee.findUnique({
            where: { userId: userId },
        });

        if (!employee) {
            throw new NotFoundException('Employee not found for this user ID.');
        }

        return employee.id;
    }
}