import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VnpayModule } from 'nestjs-vnpay';
import { ignoreLogger } from 'vnpay';
import { JwtModule } from '@nestjs/jwt';
import { OrdersService } from 'src/orders/orders.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    VnpayModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secureSecret: configService.get<string>('VNPAY_SECURE_SECRET'),
        tmnCode: configService.get<string>('VNPAY_TMN_CODE'),
        loggerFn: ignoreLogger,
      }),
      inject: [ConfigService],
      
    }),
    JwtModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService, ConfigService, OrdersService, PrismaService],
  exports: [PaymentService],
})
export class PaymentModule {}
