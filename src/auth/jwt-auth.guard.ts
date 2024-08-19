import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const secret = this.configService.get<string>('SECRET');
            if (!secret) {
                throw new Error('Secret key is not defined');
            }

            const payload = await this.jwtService.verifyAsync(token, {
                secret,
            });

            request.user = payload;

        } catch (error) {
            console.error('JWT Error:', error.message);
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: any): string | null {
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            return null;
        }
        const [type, token] = authorizationHeader.split(' ');
        return type === 'Bearer' ? token : null;
    }
}

