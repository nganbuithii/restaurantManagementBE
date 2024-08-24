import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dto/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

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
}
