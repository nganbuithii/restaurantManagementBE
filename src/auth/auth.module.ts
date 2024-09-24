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
import { OAuth2Client } from 'google-auth-library';
import { GoogleStrategy } from './passport/google.strategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    UserModule, PassportModule,CloudinaryModule,
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
  providers: [GoogleStrategy,AuthService, PrismaService, JwtService  , JwtStrategy, ConfigService, UserService,  OtpService, EmailService,LocalStrategy,
    LocalStrategy,
    {
      provide: OAuth2Client,
      useFactory: () => {
        return new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      },
    },
  ]
})
export class AuthModule {}
