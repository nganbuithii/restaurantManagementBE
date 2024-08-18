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
    const { action, description } = createPermissionDto;

    // Kiểm tra xem quyền đã tồn tại hay chưa
    const existingPermission = await this.prismaService.permission.findFirst({
      where: { action },
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
        description,
      },
    });

    return permission;
  }

  async getAll(filters: PermissionFilterType): Promise<PermissionPaginationResponseType> {
    const items_per_page = Number(filters.items_per_page) || 10;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';

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
}
