import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [UserController],
  imports:[JwtModule],
  providers: [UserService, PrismaService, ConfigService],
  exports: [UserService],

})
export class UserModule {}
