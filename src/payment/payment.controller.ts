import { Controller, Post, Get, Body, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from './payment.service';
import { OrdersService } from 'src/orders/orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IUser } from 'interfaces/user.interface';
import { OrderStatus } from 'src/orders/dto/orders.dto';
import { CurrentUser } from 'decorators/customize';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService, private readonly orderService: OrdersService) { }

  @Post('create_payment_url')
  async createPaymentUrl(@Body() body: { orderId: string; amount: number; bankCode?: string }, @Res() res: Response) {
    const { orderId, amount, bankCode } = body;
    const paymentUrl = await this.paymentService.createPaymentUrl(orderId, amount, bankCode);
    res.json({ paymentUrl });
  }

  @Post('vnpay_data')
  async logVnpayData(@Body() body: { vnp_PayDate: string; vnp_TransactionStatus: string; vnp_TxnRef: string; vnp_ResponseCode: string }, @CurrentUser() user: IUser) {
    const { vnp_PayDate, vnp_TransactionStatus, vnp_TxnRef, vnp_ResponseCode } = body;

    return this.paymentService.handlePaymentReturn(body, user)
  }

  @Post('querydr')
  async querydr(@Body() body: { orderId: string; transDate: string }) {
    const { orderId, transDate } = body;
    return this.paymentService.queryTransaction(orderId, transDate);
  }

  @Post('refund')
  async refund(@Body() body: { orderId: string; transDate: string; amount: number; transType: string; user: string }) {
    const { orderId, transDate, amount, transType, user } = body;
    return this.paymentService.refundTransaction({ orderId, transDate, amount, transType, user });
  }
}
