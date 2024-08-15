import { Injectable } from '@nestjs/common';
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
}
