import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[JwtModule, CloudinaryModule],
  controllers: [MenuItemController],
  providers: [MenuItemService, PrismaService,ConfigService],
})
export class MenuItemModule {}
