// permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'decorators/permission';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Kiểm tra xem user và permissions có tồn tại không
    if (!user || !user.permissions) {
      console.log('User or permissions not found:', user);
      return false;
    }
    
    return this.matchPermissions(requiredPermissions, user.permissions);
  }

  private matchPermissions(requiredPermissions: string[], userPermissions: string[]): boolean {
    return requiredPermissions.every(permission => userPermissions.includes(permission));
  }
}