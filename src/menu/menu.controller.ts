import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { CreateMenuDto, MenuFilterType, MenuPaginationResponseType, UpdateMenuDto } from './dto/menu.dto';
import { IUser } from 'interfaces/user.interface';
import { Menu, MenuItem } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Menu")
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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("get detail menu by id")
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<Menu & { menuItems: MenuItem[] }> {
    return this.menuService.getDetail(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" update menu by id")
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMenuDto, @CurrentUser() user:IUser): Promise<Menu> {
        return this.menuService.update(id, data, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ResponseMessage(" delete menu  by id")
      deleteMenuItem(@Param('id', ParseIntPipe) id: number, @CurrentUser() user:IUser): Promise<void> {
          return this.menuService.delete(id, user);
      }
}
