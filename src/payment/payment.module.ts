import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, ConfigService]
})
export class PaymentModule {}
