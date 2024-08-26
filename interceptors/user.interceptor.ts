// user.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.role && user.role.permissions) {
      request.user = {
        ...user,
        role: {
          ...user.role,
          permissions: user.role.permissions.map(p => ({
            ...p,
            fullPermission: `${p.action}_${p.resource}`
          }))
        }
      };
    }
    return next.handle();
  }
}