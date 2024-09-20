import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationService } from 'src/notification/notification.service';
@Module({
  imports:[JwtModule,],
  controllers: [VouchersController],
  exports: [VouchersService],
  providers: [VouchersService, PrismaService, ConfigService, NotificationService],
})
export class VouchersModule {}
