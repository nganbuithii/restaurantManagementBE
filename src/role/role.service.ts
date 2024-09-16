import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

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

    async create(createRoleDto: CreateRoleDto) {
        const { name, permissionIds } = createRoleDto;

        const existingRole = await this.prismaService.role.findUnique({
            where: { name },
        });

        if (existingRole) {
            throw new HttpException(
                { message: 'Role already exists' },
                HttpStatus.BAD_REQUEST,
            );
        }

        const permissions = await this.prismaService.permission.findMany({
            where: { id: { in: permissionIds } },
        });

        if (permissions.length !== permissionIds.length) {
            throw new HttpException(
                { message: 'Some permissions do not exist' },
                HttpStatus.BAD_REQUEST,
            );
        }

        const newRole = await this.prismaService.role.create({
            data: {
                name,
                permissions: {
                    create: permissionIds.map((permissionId) => ({
                        permission: { connect: { id: permissionId } },
                    })),
                },
            },
            include: { permissions: true }, 
        });

        return newRole;
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
                        permission: {
                            select: {
                                id: true,
                                apiPath: true,
                                method: true,
                                module: true,
                            },
                        },
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


    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const { name, permissionIds } = updateRoleDto;

        const role = await this.prismaService.role.findUnique({
            where: { id },
        });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        // Xóa tất cả quyền hiện tại của role
        await this.prismaService.rolePermission.deleteMany({
            where: { roleId: id },
        });

        // Thêm quyền mới cho role
        if (permissionIds.length > 0) {
            const rolePermissions = permissionIds.map(permissionId => ({
                roleId: id,
                permissionId,
            }));

            await this.prismaService.rolePermission.createMany({
                data: rolePermissions,
            });
        }

        // Cập nhật thông tin vai trò
        return this.prismaService.role.update({
            where: { id },
            data: {
                name,
                updatedAt: new Date(),
            },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });
    }

    async assignPermissionsToRole(roleId: number, permissionIds: number[]) {
        await this.prismaService.rolePermission.deleteMany({
            where: { roleId },
        });

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

    async changeStatus(id: number): Promise<Role> {
        const role = await this.prismaService.role.findUnique({
            where: { id },
        });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        const newStatus = !role.isActive;

        return this.prismaService.role.update({
            where: { id },
            data: { isActive: newStatus },
        });
    }
}    