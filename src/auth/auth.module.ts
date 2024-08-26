import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [UserModule, PassportModule,CloudinaryModule,
    // khai báo jwwt và sự dụng biến trong .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
            expiresIn:configService.get<string>('JWT_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService  , JwtStrategy, ConfigService, UserService,  OtpService, EmailService,LocalStrategy]
})
export class AuthModule {}
