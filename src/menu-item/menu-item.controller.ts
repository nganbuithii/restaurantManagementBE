import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMenuItemDto, MenuItemFilterType, MenuItemPaginationResponseType } from './dto/menu-item.dto';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("create new menu item")
  @UseInterceptors(FilesInterceptor('files'))
  createIngredient(
    @Body() body: CreateMenuItemDto, 
  @CurrentUser() user: IUser,
  @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.menuItemService.create(body, user, files);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("get all menu item with pagination")
  getAll(@Query() params: MenuItemFilterType): Promise<MenuItemPaginationResponseType> {
    return this.menuItemService.getAll(params);
  }
}
