import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
@Module({
  imports:[JwtModule],
  controllers: [TableController],
  providers: [TableService, PrismaService,ConfigService],
})
export class TableModule {}
