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
  async me(@Req() req) {
    const userId = req.user.sub; // `sub` là userId trong JWT payload
    const userWithRole = await this.userService.getUserWithRole(userId);

    return userWithRole;
}
}
