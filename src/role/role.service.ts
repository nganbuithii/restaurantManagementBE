import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
}
