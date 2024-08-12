import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    // Tạo controller đăng kí
    @Post('register')
    async register(@Body() body: RegisterDto): Promise<User> {
        return this.authService.register(body);
    }

    // api login
    @Post('login')
    async login(@Body() body: LoginDto): Promise<any>{
        return this.authService.login(body)
    }


}
