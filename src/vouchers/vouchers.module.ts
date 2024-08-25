import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[JwtModule],
  controllers: [VouchersController],
  exports: [VouchersService],
  providers: [VouchersService, PrismaService, ConfigService],
})
export class VouchersModule {}
