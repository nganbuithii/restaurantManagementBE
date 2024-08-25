import { Module } from '@nestjs/common';
import { WarehouseSlipsService } from './warehouse-slips.service';
import { WarehouseSlipsController } from './warehouse-slips.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [WarehouseSlipsController],
  providers: [WarehouseSlipsService, PrismaService, ConfigService],
})
export class WarehouseSlipsModule {}
