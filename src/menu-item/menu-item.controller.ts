import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMenuItemDto, MenuItemFilterType, MenuItemPaginationResponseType, UpdateMenuItemDto } from './dto/menu-item.dto';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';
import { MenuItem } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from 'decorators/permission';

@ApiTags("MenuItem")
@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('CREATE_MENU_ITEM')
  @ResponseMessage("create new menu item")
  @UseInterceptors(FilesInterceptor('files'))
  createMenuItem(
    @Body() body: CreateMenuItemDto, 
    @CurrentUser() user: IUser,
  @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.menuItemService.create(body, user, files);
  }


  @Get()
  // @UseGuards(JwtAuthGuard)
  @ResponseMessage("get all menu item with pagination")
  getAll(@Query() params: MenuItemFilterType): Promise<MenuItemPaginationResponseType> {
    return this.menuItemService.getAll(params);
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" get detail menu item by id")
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<MenuItem> {
    return this.menuItemService.getDetail(id)
  }

  // @Patch(':id')
  // @RequirePermissions('UPDATE_MENU_ITEM')
  // @UseGuards(JwtAuthGuard)
  // @ResponseMessage(" update menu item by id")
  //   update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMenuItemDto, @CurrentUser() user:IUser): Promise<MenuItem> {
  //       return this.menuItemService.update(id, data, user);
  //   }


    
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequirePermissions('DELETE_MENU_ITEM')
  @ResponseMessage(" delete menu item by id")
    deleteMenuItem(@Param('id', ParseIntPipe) id: number, @CurrentUser() user:IUser): Promise<void> {
        return this.menuItemService.delete(id, user);
    }
}
