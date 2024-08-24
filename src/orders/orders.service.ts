import { Order } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/orders.dto';
import { IUser } from 'interfaces/user.interface';
@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async create(createOrderDto: CreateOrderDto, user: IUser): Promise<Order> {
        const { status, totalPrice, discountPrice, details } = createOrderDto;
    
        // Create the order
        const order = await this.prisma.order.create({
          data: {
            status,
            totalPrice,
            discountPrice,
            userId: user.sub,
            details: {
              create: details.map(detail => ({
                quantity: detail.quantity,
                menuItem: { connect: { id: detail.menuItemId } }
              }))
            }
          },
          include: {
            details: true
          }
        });
    
        return order;
      }
}
