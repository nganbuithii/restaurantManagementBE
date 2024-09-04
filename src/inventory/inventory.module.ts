import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[JwtModule],
  controllers: [InventoryController],
  providers: [InventoryService, PrismaService, ConfigService],
})
export class InventoryModule {}
