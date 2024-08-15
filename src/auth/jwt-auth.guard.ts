import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly jwtService: JwtService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]; // Lấy token từ header Authorization

        if (!token) {
            console.log('No token provided'); // Debug
            throw new UnauthorizedException('No token provided');
        }

        try {
            // Debug: Kiểm tra jwtService
            console.log('JwtService:', this.jwtService);
            if (!this.jwtService) {
                throw new Error('JwtService is not initialized');
            }

            const decoded = this.jwtService.verify(token); // Giải mã token
            console.log('Token decoded:', decoded); // Debug
            request.user = decoded; // Gán thông tin người dùng vào request
        } catch (error) {
            console.log('Invalid token:', error.message); // Debug
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }
}
