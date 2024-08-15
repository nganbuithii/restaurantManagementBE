import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly userService: UserService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req) {
    return req.user;
  }
}
