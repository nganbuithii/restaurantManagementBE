import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE } from 'decorators/customize';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                const message = this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler());
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    message: message || 'Success',
                    data: data
                };
            }),
        );
    }
}