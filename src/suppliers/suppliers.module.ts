import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[JwtModule],
  controllers: [SuppliersController],
  providers: [SuppliersService, PrismaService, ConfigService],
})
export class SuppliersModule {}
