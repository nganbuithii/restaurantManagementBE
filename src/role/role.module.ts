import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[JwtModule,],
  controllers: [RoleController],
  providers: [RoleService, PrismaService,ConfigService ]
})
export class RoleModule {}
