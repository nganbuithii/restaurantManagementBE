import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    
    ConfigModule,
    UserModule,
    AuthModule, RoleModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_PIPE,
      useClass:ValidationPipe
    },
  ],
})
export class AppModule {}
