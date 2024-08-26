import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
            where: { name: 'CUSTOMER' },
            update: {},
            create: { name: 'CUSTOMER' },
        });
    }

    async create(body: CreateRoleDto): Promise<Role> {
        // Kiểm tra xem role có tồn tại hay không
        const existingRole = await this.prismaService.role.findUnique({
            where: { name: body.name },
        });

        if (existingRole) {
            throw new BadRequestException('Role with this name already exists');
        }

        // Tạo role mới nếu không bị trùng
        return this.prismaService.role.create({
            data: body,
        });
    }

    async getAll(): Promise<Role[]> {
        return this.prismaService.role.findMany();
    }

    async getById(id: number): Promise<Role> {
        const role = await this.prismaService.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        permission: true,  // Bao gồm chi tiết của permission
                    },
                },
            },
        });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        // Lấy danh sách permissions từ mối quan hệ RolePermission
        const detailedRole = {
            ...role,
            permissions: role.permissions.map(rp => rp.permission),
        };

        return detailedRole;
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


    async assignPermissionsToRole(roleId: number, permissionIds: number[]) {
        // Xóa tất cả các quyền hiện tại của role
        await this.prismaService.rolePermission.deleteMany({
            where: { roleId },
        });

        // Tạo mới các quyền cho role
        const rolePermissions = permissionIds.map(permissionId => ({
            roleId,
            permissionId,
        }));

        await this.prismaService.rolePermission.createMany({
            data: rolePermissions,
        });

        return this.prismaService.role.findUnique({
            where: { id: roleId },
            include: { permissions: true },
        });
    }
    async updateRolePermissions(roleId: number, newPermissionIds: any) {
        // Kiểm tra xem newPermissionIds có phải là một mảng không
        if (!Array.isArray(newPermissionIds)) {
            throw new BadRequestException('Permissions should be an array of numbers');
        }
    
        // Xóa tất cả quyền hiện tại của role
        await this.prismaService.rolePermission.deleteMany({
            where: { roleId },
        });
    
        // Thêm các quyền mới
        const createPromises = newPermissionIds.map(permissionId =>
            this.prismaService.rolePermission.create({
                data: {
                    roleId,
                    permissionId,
                },
            })
        );
    
        await Promise.all(createPromises);
    
        // Trả về role với danh sách quyền mới
        return this.prismaService.role.findUnique({
            where: { id: roleId },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });
    }
    
}    