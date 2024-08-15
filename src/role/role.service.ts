import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async getOrCreateDefaultRole() {
        return this.prismaService.role.upsert({
            where: { name: 'NORMAL_USER' },
            update: {},
            create: { name: 'NORMAL_USER' },
        });
    }

    async create(body: CreateRoleDto): Promise<Role> {
        const role = await this.prismaService.role.create({
            data: {
                name: body.name,
            },
        });

        return role;
    }

    async getAll(): Promise<Role[]> {
        return this.prismaService.role.findMany();
    }

    async getById(id: number): Promise<Role> {
        const role = await this.prismaService.role.findUnique({
            where: { id },
        });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }

    async update(id: number, name: string): Promise<Role> {
        const role = await this.prismaService.role.findUnique({
            where: { id },
        });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        return this.prismaService.role.update({
            where: { id },
            data: {
                name,
                updatedAt: new Date(), // Cập nhật ngày updatedAt
            },
        });
    }
}
