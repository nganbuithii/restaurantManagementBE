import { BadRequestException, Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private userService: UserService
  ) { }

  // Tạo controller đăng kí
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<User> {
    return this.authService.register(body);
  }

  // api login
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() body: LoginDto, @Request() req): Promise<any> {
    return this.authService.login(body)
  }


  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.sendPasswordResetOTP(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string; otp: string; newPassword: string }) {
    return this.authService.resetPassword(body.email, body.otp, body.newPassword);
  }

}
