import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { firebaseAdminProvider } from './firebase-admin.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[JwtModule,],
  controllers: [NotificationController],
  providers: [firebaseAdminProvider, NotificationService, ConfigService]
})
export class NotificationModule {}
