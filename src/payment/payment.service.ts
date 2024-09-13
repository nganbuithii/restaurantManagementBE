import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as querystring from 'qs';
import moment from 'moment';
import { OrdersService } from 'src/orders/orders.service';
import { IUser } from 'interfaces/user.interface';
import { OrderStatus } from 'src/orders/dto/orders.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly configService: ConfigService, private readonly orderService:OrdersService) { }

  createPaymentUrl(orderId: string, amount: number, bankCode?: string): string {
    const tmnCode = this.configService.get<string>('VNPAY_TMN_CODE');
    const secretKey = this.configService.get<string>('VNP_HASH_SECRET');
    const returnUrl = this.configService.get<string>('VNP_RETURN_URL');
    console.log("hash key", secretKey)
  
    const createDate = moment().format('YYYYMMDDHHmmss');
    const expireDate = moment().add(15, 'minutes').format('YYYYMMDDHHmmss');
  
    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: '127.0.0.1',
      vnp_CreateDate: createDate,
    };
  
    if (bankCode) {
      vnp_Params['vnp_BankCode'] = bankCode;
    }
    console.log("poarams", vnp_Params)
  
    const redirectUrl = new URL('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');

    Object.entries(vnp_Params)
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .forEach(([key, value]) => {
        // Skip empty value
        if (!value || value === "" || value === undefined || value === null) {
          return;
        }
        redirectUrl.searchParams.append(key, value.toString());
      });

    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac
      .update(Buffer.from(redirectUrl.searchParams.toString(), 'utf-8'))
      .digest("hex");

    redirectUrl.searchParams.append("vnp_SecureHash", signed);

    return redirectUrl.href;
  }

  async verifyPayment(query: any, secretKey: string): Promise<boolean> {
    const hashData = Object.keys(query)
      .filter(key => key.startsWith('vnp_') && key !== 'vnp_SecureHash')
      .map(key => `${key}=${query[key]}`)
      .join('&');

    const secureHash = crypto.createHmac('sha256', secretKey)
      .update(hashData)
      .digest('hex')
      .toUpperCase();

    return secureHash === query.vnp_SecureHash;
  }

  async handlePaymentReturn(vnpayData: { vnp_PayDate: string; vnp_TransactionStatus: string; vnp_TxnRef: string; vnp_ResponseCode: string }, user:IUser) {
    const { vnp_PayDate, vnp_TransactionStatus, vnp_TxnRef, vnp_ResponseCode } = vnpayData;
    console.log("Processing payment return...");
    console.log("vnp_PayDate:", vnp_PayDate);
    console.log("vnp_TransactionStatus:", vnp_TransactionStatus);
    console.log("vnp_TransactionNo:", vnp_TxnRef);
    console.log("vnp_ResponseCode:", vnp_ResponseCode);

    if (vnp_ResponseCode === '00' && vnp_TransactionStatus === '00') {
      const order = await this.orderService.updateStatus(Number(vnp_TxnRef),OrderStatus.COMPLETED,user);
      if (order) {
        return {
          message: 'Payment processed successfully!',
          orderId: vnp_TxnRef,
          status: OrderStatus.COMPLETED,
        };
      } else {
        throw new Error('Order not found or could not be updated.');
      }
    } else {
      throw new Error('Payment failed or was not successful.');
    }
  }

  async queryTransaction(orderId: string, transDate: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async refundTransaction(refundData: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  verifyReturnUrl(params: any, secureHash: string): boolean {
    const sortedParams = this.sortObject(params);
    const signData = querystring.stringify(sortedParams);
    const calculatedHash = this.generateSecureHash(signData);
    return calculatedHash === secureHash;
  }

  private sortObject(obj: any): any {
    const sorted: any = {};
    const str = Object.keys(obj).sort();
    str.forEach(key => {
      if (obj[key] !== undefined && obj[key] !== null) {
        sorted[key] = obj[key].toString();
      }
    });
    return sorted;
  }

  private formatDateTime(date: Date): string {
    return moment(date).format('YYYYMMDDHHmmss');
  }

  private generateSecureHash(data: string): string {
    const hmac = crypto.createHmac('sha512', process.env.VNP_HASH_SECRET);
    return hmac.update(Buffer.from(data, 'utf-8')).digest('hex');
  }
}