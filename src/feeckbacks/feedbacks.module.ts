import { Module } from '@nestjs/common';
import { FeeckbacksService } from './feedbacks.service';
import { FeeckbacksController } from './feedbacks.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[JwtModule],
  controllers: [FeeckbacksController],
  providers: [FeeckbacksService, PrismaService, ConfigService],
})
export class FeeckbacksModule {}
