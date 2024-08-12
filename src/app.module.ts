import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { APP_PIPE } from '@nestjs/core';


@Module({
  imports: [AuthModule, RoleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_PIPE,
      useClass:ValidationPipe
    }
  ],
})
export class AppModule {}
