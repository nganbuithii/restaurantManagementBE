
import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// design một decorator
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// CẤU HÌNH DATA TRẢ RA CỦA API
export const  RESPONSE_MESSAGE = 'response_message';
export const ResponseMessage = (message : string) =>
    SetMetadata(RESPONSE_MESSAGE,message);

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

export const IS_PUBLIC_PERMISSION = "isPublicPermission"
export const skipCheckPermission = () => SetMetadata(IS_PUBLIC_PERMISSION, true)