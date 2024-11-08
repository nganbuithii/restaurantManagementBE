import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';
import { Order } from '@prisma/client';
import { CreateOrderDto, OrderFilterType, OrderPaginationResponseType, OrderStatisticsDto, UpdateOrderDto } from './dto/orders.dto';
import { VouchersService } from 'src/vouchers/vouchers.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OrderStatus } from './dto/orders.dto';

@ApiTags("Orders")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
    private readonly vouchersService: VouchersService
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Order created successfully')
  createOrder(
    @Body() body: CreateOrderDto,
    @CurrentUser() user: IUser,
  ): Promise<Order> {
    return this.ordersService.create(body, user);
  }



  @Get()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("get all orders with pagination")
  getAll(@Query() params: OrderFilterType): Promise<OrderPaginationResponseType> {
    return this.ordersService.getAll(params);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" get order by id")
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.getDetail(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Order updated successfully')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentUser() user: IUser,
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto, user);
  }

  @Post('/:orderId/apply-voucher')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Apply voucher to order")
  applyVoucher(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() body: { voucherCode: string }
  ): Promise<Order> {
    return this.vouchersService.applyVoucher(orderId, body.voucherCode);
  }

  @Patch(':id/change-status')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Order status updated successfully')
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: OrderStatus },
    @CurrentUser() user: IUser,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, body.status, user);
  }

  @Post('statistics')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage('Order statistics retrieved successfully')
  async getStatistics(): Promise<OrderStatisticsDto> {
    return this.ordersService.getStatistics();
  }
  @Post('revenue-statistics')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Get revenue statistics")
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        year: { type: 'number', nullable: true },
        month: { type: 'number', nullable: true }
      }
    }
  })
  async getRevenueStatistics(
    @Body() filterData: { year?: number; month?: number }
  ) {
    return this.ordersService.getRevenueStatistics(filterData);
  }

 
  @UseGuards(JwtAuthGuard)
@Post('/me')
async getOrdersByUserIdAndDate(
  @CurrentUser() user: IUser,
  @Body('year') year: number,
  @Body('month') month: number,
) {
  const orders = await this.ordersService.getOrdersByUserIdAndDate(user, year, month);
  return { orders };
}
}
