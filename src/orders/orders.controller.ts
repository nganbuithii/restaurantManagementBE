import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';
import { Order } from '@prisma/client';
import { CreateOrderDto, OrderFilterType, OrderPaginationResponseType, UpdateOrderDto } from './dto/orders.dto';

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


  
  @Get()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("get all orders with pagination")
  getAll(@Query() params: OrderFilterType): Promise<OrderPaginationResponseType> {
    return this.ordersService.getAll(params);
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
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

}
