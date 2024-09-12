import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as querystring from 'querystring';
import moment from 'moment';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
    constructor(private configService: ConfigService) {}

    async createVnpayPaymentUrl(createPaymentDto: CreatePaymentDto): Promise<string> {
        const { orderId, amount, orderInfo } = createPaymentDto;
    
        const tmnCode = this.configService.get<string>('VNP_TMN_CODE');
        const secretKey = this.configService.get<string>('VNP_HASH_SECRET');
        console.log("KEYYYYY", secretKey)
        const vnpUrl = this.configService.get<string>('VNP_URL');
        const returnUrl = this.configService.get<string>('VNP_RETURN_URL');
    
        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');
        const generatedOrderId = moment(date).format('HHmmss');    
        const vnpParams = {
          vnp_Version: '2.1.0',
          vnp_Command: 'pay',
          vnp_TmnCode: tmnCode,
          vnp_Locale: 'vn',
          vnp_CurrCode: 'VND',
          vnp_TxnRef: orderId,
          vnp_OrderInfo: orderInfo,
          vnp_OrderType: 'other',
          vnp_Amount: amount * 100,
          vnp_ReturnUrl: returnUrl,
          vnp_IpAddr: '127.0.0.1', // In production, use the actual IP address
          vnp_CreateDate: createDate,
        };
    
        const sortedParams = this.sortObject(vnpParams);
        const signData = querystring.stringify(sortedParams);
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    
        vnpParams['vnp_SecureHash'] = signed;
    
        return `${vnpUrl}?${querystring.stringify(vnpParams)}`;
      }

    async verifyReturnUrl(vnpParams: any): Promise<boolean> {
        const secretKey = this.configService.get<string>('VNP_HASH_SECRET');
        const secureHash = vnpParams['vnp_SecureHash'];

        delete vnpParams['vnp_SecureHash'];
        delete vnpParams['vnp_SecureHashType'];

        vnpParams = this.sortObject(vnpParams);

        const signData = querystring.stringify(vnpParams);
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 

        return secureHash === signed;
    }


    async queryTransaction(orderId: string, transDate: string): Promise<any> {
        // Implement VNPay transaction query logic here
        // This will depend on VNPay's API for querying transactions
        // You'll need to make an HTTP request to VNPay's query API
        throw new Error('Method not implemented.');
    }

    async refundTransaction(refundData: any): Promise<any> {
        // Implement VNPay refund logic here
        // This will depend on VNPay's API for refunding transactions
        // You'll need to make an HTTP request to VNPay's refund API
        throw new Error('Method not implemented.');
    }

    private sortObject(obj: any): any {
        const sorted: any = {};
        const str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }
}