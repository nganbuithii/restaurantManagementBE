import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[JwtModule],
  controllers: [IngredientController],
  providers: [IngredientService, PrismaService,ConfigService],
})
export class IngredientModule {}
