import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CartService } from 'src/cart/cart.service';
@Module({
  controllers: [UserController],
  imports:[JwtModule, CloudinaryModule],
  providers: [UserService, PrismaService, ConfigService, CartService],
  exports: [UserService],

})
export class UserModule {}
