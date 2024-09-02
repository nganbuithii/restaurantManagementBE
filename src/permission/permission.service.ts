import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto, PermissionFilterType, PermissionPaginationResponseType } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IUser } from 'interfaces/user.interface';
import { PrismaService } from 'src/prisma.service';
import { Permission } from '@prisma/client';
@Injectable()
export class PermissionService {
  constructor(private prismaService: PrismaService) { }
  async create(createPermissionDto: CreatePermissionDto) {
    const { action, description, resource } = createPermissionDto;

    // Kiểm tra xem quyền đã tồn tại hay chưa
    const existingPermission = await this.prismaService.permission.findFirst({
      where: { action, resource },
    });

    if (existingPermission) {
      throw new HttpException(
        { message: 'Permission already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Tạo quyền mới
    const permission = await this.prismaService.permission.create({
      data: {
        action,
        resource,
        description,
      },
    });

    return permission;
  }

  async getAll(filters: PermissionFilterType): Promise<PermissionPaginationResponseType> {
    const items_per_page = Number(process.env.ITEMS_PER_PAGE) ; 
    const page = Number(filters.page) || 1;
    const search = filters.search || "";

    const skip = page > 1 ? (page - 1) * items_per_page : 0;
    const permissions = await this.prismaService.permission.findMany({
      take: items_per_page,
      skip,
      where: {

        deletedAt: null,  // Chỉ lấy các bản ghi chưa bị xóa
        OR: [
          {
            action: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await this.prismaService.permission.count({
      where: {
        action: {
          contains: search,
        },
      },
    });

    return {
      data: permissions,
      total,
      currentPage: page,
      itemsPerPage: items_per_page,
    };
  }

  async getDetail(id: number): Promise<Permission> {
    const permission = await this.prismaService.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Permission with ID ${id} not found`,
      });
    }

    return permission;
  }


  async update(id: number, data: { action?: string; description?: string }): Promise<Permission> {
    const permission = await this.prismaService.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Permission with ID ${id} not found`,
      });
    }

    const updatedPermission = await this.prismaService.permission.update({
      where: { id },
      data: {
        action: data.action ?? permission.action,
        description: data.description ?? permission.description,
      },
    });

    return updatedPermission;
  }


  async remove(id: number): Promise<void> {
    const permission = await this.prismaService.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Permission with ID ${id} not found`,
      });
    }

    await this.prismaService.permission.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }


  async getRolePermissions(roleId: number): Promise<string[]> {
    const roleWithPermissions = await this.prismaService.role.findUnique({
      where: { id: roleId },
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    });

    return roleWithPermissions.permissions.map(rp => rp.permission.action);
  }

  async hasPermission(roleId: number, requiredPermission: string): Promise<boolean> {
    const permissions = await this.getRolePermissions(roleId);
    return permissions.includes(requiredPermission);
  }
}
