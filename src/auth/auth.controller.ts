import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService,
        private userService:UserService
    ){}

    // Tạo controller đăng kí
    @Post('register')
    async register(@Body() body: RegisterDto): Promise<User> {
        return this.authService.register(body);
    }

    // api login
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Body() body: LoginDto, @Request() req): Promise<any>{
        return this.authService.login(body)
    }

    


}
