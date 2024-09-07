import { Order } from '@prisma/client';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto, OrderFilterType, OrderPaginationResponseType, OrderStatus, UpdateOrderDto } from './dto/orders.dto';
import { IUser } from 'interfaces/user.interface';
@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto, user: IUser): Promise<Order> {
    const { status, discountPrice, details } = createOrderDto;

    // Tính toán tổng số tiền (totalPrice)
    let totalPrice = 0;
    for (const detail of details) {
      const menuItem = await this.prisma.menuItem.findUnique({
        where: { id: detail.menuItemId },
      });

      if (!menuItem) {
        throw new NotFoundException(`MenuItem with id ${detail.menuItemId} not found`);
      }

      // Cộng thêm vào totalPrice
      totalPrice += menuItem.price * detail.quantity;
    }

    // Tạo hóa đơn
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
        details: true,
      },
    });

    return order;
  }



  async getAll(params: OrderFilterType): Promise<OrderPaginationResponseType> {
    const { page = 1, items_per_page = parseInt(process.env.ITEMS_PER_PAGE, 10) || 10, search } = params;
    const skip = (page - 1) * items_per_page;

    // Xử lý tìm kiếm chỉ theo trạng thái
    const where = search
      ? {
        status: { contains: search }
      }
      : {};

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: items_per_page,
        include: {
          details: true,
        },
      }),
      this.prisma.order.count({ where }), // Sửa ở đây
    ]);

    // Chuyển đổi orders thành OrderResponseDto
    const customOrders = orders.map(order => ({
      id: order.id,
      status: order.status,
      totalPrice: order.totalPrice,
      discountPrice: order.discountPrice,
      userId: order.userId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      usedVoucherId: order.usedVoucherId,
      details: order.details.map(detail => ({
        id: detail.id,
        quantity: detail.quantity,
        menuItemId: detail.menuItemId,
        // createdAt: detail.createdAt, // Bỏ comment nếu cần createdAt cho details
      })),
    }));

    return {
      data: customOrders,
      total,
      currentPage: page,
      itemsPerPage: items_per_page,
    };
  }





  async getDetail(id: number): Promise<any> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        details: {
          include: {
            menuItem: true,  
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return {
      id: order.id,
      status: order.status,
      totalPrice: order.totalPrice,
      discountPrice: order.discountPrice,
      userId: order.userId,
      createdAt: order.createdAt,
      details: order.details.map((detail) => ({
        id: detail.id,
        quantity: detail.quantity,
        menuItemId: detail.menuItemId,
        menuItemName: detail.menuItem ? detail.menuItem.name : 'Unknown', 
      })),
    };
  }


  async update(id: number, updateOrderDto: UpdateOrderDto, user: IUser): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    if (order.userId !== user.sub) {
      throw new ForbiddenException('You are not allowed to update this order');
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
      },
    });
  }


  async updateStatus(orderId: number, status: OrderStatus, user: IUser): Promise<Order> {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

}
