import { Controller, Get, Post, Query, Body, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/payment.dto';
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get('banks')
    async getBankList() {
        try {
            const banks = await this.paymentService.getBankList();
            return {
                success: true,
                data: banks
            };
        } catch (error) {
            return {
                success: false,
                message: 'Không thể lấy danh sách ngân hàng',
                error: error.message
            };
        }
    }

    @Post('create_vnpay_url')
    async createVnpayUrl(@Body() createPaymentDto: CreatePaymentDto) {
        const paymentUrl = await this.paymentService.createVnpayPaymentUrl(createPaymentDto);
        return { paymentUrl };
    }

    @Get('vnpay_return')
    async handleReturnUrl(@Query() vnpParams: any, @Res() res: Response) {
        const isValidSignature = await this.paymentService.verifyReturnUrl(vnpParams);
        if (isValidSignature) {
            // Xử lý khi thanh toán thành công
            // Cập nhật trạng thái đơn hàng trong DB
            res.render('success', { code: vnpParams['vnp_ResponseCode'] });
        } else {
            res.render('error', { code: '97' });
        }
    }

    @Post('querydr')
    async queryTransaction(@Body() body: any, @Res() res: Response) {
        const result = await this.paymentService.queryTransaction(body.orderId, body.transDate);
        res.json(result);
    }

    @Post('refund')
    async refundTransaction(@Body() body: any, @Res() res: Response) {
        const result = await this.paymentService.refundTransaction(body);
        res.json(result);
    }
}