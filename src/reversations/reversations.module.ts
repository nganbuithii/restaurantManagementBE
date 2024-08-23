import { Module } from '@nestjs/common';
import { ReversationsService } from './reversations.service';
import { ReversationsController } from './reversations.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
@Module({
  imports:[JwtModule, CloudinaryModule],
  controllers: [ReversationsController],
  providers: [ReversationsService, PrismaService,ConfigService],
})
export class ReversationsModule {}
