import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
@Module({
  imports:[JwtModule, CloudinaryModule],
  controllers: [MenuController],
  providers: [MenuService, PrismaService,ConfigService],
})
export class MenuModule {}
