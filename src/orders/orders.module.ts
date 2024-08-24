import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[JwtModule],
  controllers: [OrdersController],
  providers: [OrdersService,PrismaService,ConfigService]
})
export class OrdersModule {}
