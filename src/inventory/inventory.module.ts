import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';

@Module({
  imports:[JwtModule],
  controllers: [InventoryController],
  providers: [InventoryService, PrismaService, ConfigService,EmailService],
})
export class InventoryModule {}
