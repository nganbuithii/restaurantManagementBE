import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}


}
