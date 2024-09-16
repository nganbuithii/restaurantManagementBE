import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector, private prismaService: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.get<{ apiPath: string; method: string; module: string }[]>('permissions', context.getHandler());
        if (!requiredPermissions) {
            return true; // Không cần kiểm tra quyền nếu không có quyền được chỉ định
        }
    
        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
        if (!user) {
            throw new ForbiddenException('User not found');
        }
    
        // Lấy thông tin role và quyền của người dùng từ cơ sở dữ liệu
        const userRole = await this.prismaService.role.findUnique({
            where: { id: user.roleId },
            include: { permissions: { include: { permission: true } } },
        });
    
        if (!userRole || !userRole.isActive) {
            throw new ForbiddenException('Role not found or inactive');
        }
    
        // Lấy danh sách quyền của người dùng (sử dụng apiPath, method và module)
        const userPermissions = userRole.permissions.map(rp => ({
            apiPath: rp.permission.apiPath,
            method: rp.permission.method,
            module: rp.permission.module,
        }));
    
        // Kiểm tra xem người dùng có quyền yêu cầu không
        const hasPermission = requiredPermissions.every(reqPerm =>
            userPermissions.some(userPerm =>
                userPerm.apiPath === reqPerm.apiPath &&
                userPerm.method === reqPerm.method &&
                userPerm.module === reqPerm.module
            )
        );
    
        if (!hasPermission) {
            throw new ForbiddenException('Insufficient permissions');
        }
    
        return true;
    }
    
}
