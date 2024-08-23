import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { CreateMenuDto, MenuFilterType, MenuPaginationResponseType } from './dto/menu.dto';
import { IUser } from 'interfaces/user.interface';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("create new menu ")
  createMenu(
    @Body() body: CreateMenuDto,
    @CurrentUser() user: IUser,
  ) {
    return this.menuService.create(body, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("get all menu item with pagination")
  getAll(@Query() params: MenuFilterType): Promise<MenuPaginationResponseType> {
    return this.menuService.getAll(params);
  }
}
