import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PermissionModule } from './permission/permission.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { MenuModule } from './menu/menu.module';
import { TableModule } from './table/table.module';
import { ReversationsModule } from './reversations/reversations.module';
import { OrdersModule } from './orders/orders.module';
import { FeeckbacksModule } from './feeckbacks/feedbacks.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { WarehouseSlipsModule } from './warehouse-slips/warehouse-slips.module';
import { EmailModule } from './email/email.module';
import { OtpService } from './otp/otp.service';
import { InventoryModule } from './inventory/inventory.module';
import { PrismaService } from './prisma.service';
import { PaymentModule } from './payment/payment.module';
import { ChatModule } from './chat/chat.module';
import { VnpayModule } from 'nestjs-vnpay';
import { ignoreLogger } from 'vnpay';
import { ScheduleModule } from '@nestjs/schedule';
import { FirebaseModule } from './firebase/firebase.module';
import { NotificationModule } from './notification/notification.module';
import { CartModule } from './cart/cart.module';
import { CartService } from './cart/cart.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    VnpayModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
          secureSecret: configService.get<string>('VNPAY_SECURE_SECRET'),
          tmnCode: configService.get<string>('VNPAY_TMN_CODE'),
          loggerFn: ignoreLogger,
      }),
      inject: [ConfigService],
  }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '3660m' },
      }),
      inject: [ConfigService],
    }),
    
    ConfigModule,
    UserModule,
    AuthModule, RoleModule, PermissionModule, MenuItemModule, CloudinaryModule, IngredientModule, MenuModule, TableModule, ReversationsModule, OrdersModule, FeeckbacksModule, VouchersModule, SuppliersModule, WarehouseSlipsModule, EmailModule, InventoryModule, PaymentModule, ChatModule, FirebaseModule, NotificationModule, CartModule,
  ],
  controllers: [AppController],
  providers: [
    JwtAuthGuard,
    AppService,
    {
      provide:APP_PIPE,
      useClass:ValidationPipe
    },
    CloudinaryService,
    OtpService,
    PrismaService, CartService
  ],
})
export class AppModule {}
