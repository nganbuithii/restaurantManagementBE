import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVoucherDto, UpdateVoucherDto, VoucherFilterType, VoucherPaginationResponseType, VoucherStatus } from './dto/voucher.dto';
import { IUser } from 'interfaces/user.interface';
import { Order, Voucher } from '@prisma/client';
import { generateVoucherCode } from 'helper/voucher.helper';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class VouchersService {
  constructor(private prisma: PrismaService,
    private  notificationService:NotificationService
  ) { }

  async create(createVoucherDto: CreateVoucherDto, user: IUser): Promise<Voucher> {
    const {
      percent,
      description,
      startDate,
      endDate,
      isActive,
      status,
      quantity,
      pointCost,
    } = createVoucherDto;

    const code = generateVoucherCode();

    // Kiểm tra tính hợp lệ của ngày kết thúc
    if (new Date(startDate) > new Date(endDate)) {
      throw new BadRequestException('End date must be after start date');
    }

    // Tạo mới voucher
    const voucher = await this.prisma.voucher.create({
      data: {
        code,
        percent,
        description,
        startDate,
        endDate,
        isActive,
        status,
        quantity,
        pointCost,
        createdBy: user.sub,
      },
    });
    await this.notificationService.sendAndSaveNotification(
      'New Voucher Available',
      `A new voucher "${voucher.code}" has been created!`,
      'new_vouchers'
    );
    return voucher;
  }

  async getAll(filter: VoucherFilterType): Promise<VoucherPaginationResponseType> {
    const items_per_page = Number(process.env.ITEMS_PER_PAGE) ; 
    const page = Number(filter.page) || 1;
    const search = filter.search || "";

    const skip = (page - 1) * items_per_page;
    const take = items_per_page;
  
    const where = search
      ? {
          OR: [
            { code: { contains: search.toLowerCase() } },
            { description: { contains: search.toLowerCase() } },
            { percent: isNaN(Number(search)) ? undefined : Number(search) },
          ],
        }
      : {};
  
    const [vouchers, total] = await Promise.all([
      this.prisma.voucher.findMany({
        where,
        skip,
        take: items_per_page,
        orderBy: {
          id: 'desc', 
        },
      }),
      this.prisma.voucher.count({ where }),
    ]);
  
    return {
      data: vouchers,
      total,
      currentPage: page,
      itemsPerPage: items_per_page,
    };
  }
  
  async getById(id: number): Promise<Voucher> {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id },
    });

    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }

    return voucher;
  }


  async update(id: number, updateVoucherDto: UpdateVoucherDto, user: IUser): Promise<Voucher> {
    // Kiểm tra xem voucher có tồn tại hay không
    const existingVoucher = await this.prisma.voucher.findUnique({
      where: { id },
    });

    if (!existingVoucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }

    // Cập nhật thông tin voucher
    const updatedVoucher = await this.prisma.voucher.update({
      where: { id },
      data: {
        ...updateVoucherDto,
        updatedBy: user.sub
      },
    });

    return updatedVoucher;
  }


  async delete(id: number, user: IUser): Promise<void> {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id },
    });

    if (!voucher) {
      throw new NotFoundException('Voucher not found');
    }

    await this.prisma.voucher.update({
      where: { id },
      data: {
        status: 'PAUSED',
        isActive: false,
        deletedBy: user.sub,
      },
    });
  }


  async applyVoucher(orderId: number, voucherCode: string): Promise<Order> {
    // Tìm đơn hàng
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      throw new Error('Order not found');
    }
  
    // Tìm voucher
    const voucher = await this.prisma.voucher.findFirst({
      where: {
        code: voucherCode,
        isActive: true,
      },
    });
  
    if (!voucher) {
      throw new Error('Voucher not found or is not active');
    }
  
    // Tính toán số tiền giảm giá
    const discountAmount = (order.totalPrice * voucher.percent) / 100;
  
    // Cập nhật lại đơn hàng với số tiền sau khi áp dụng voucher
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        discountPrice: discountAmount, // Lưu số tiền giảm vào discountPrice
        // totalPrice: order.totalPrice - discountAmount, // Cập nhật tổng tiền sau khi giảm
        usedVoucherId: voucher.id,
      },
    });
  
    return updatedOrder;
  }
  
  async updateStatus(id: number, status: VoucherStatus, user: IUser): Promise<Partial<Voucher>> {
    return this.prisma.voucher.update({
      where: { id },
      data: { status, updatedBy: user.sub },
      select: { id: true, status: true, code: true, percent: true },  
    });
  }
  async saveVoucherForCustomer(voucherId: number, user:IUser) {
    const voucher = await this.prisma.voucher.findFirst({
      where: { id: voucherId, isActive: true, status: 'ACTIVE' }
    });

    if (!voucher) {
      throw new NotFoundException('Voucher not found or is not active');
    }

    const existingCustomerVoucher = await this.prisma.customerVoucher.findUnique({
      where: {
        userId_voucherId: {
          userId: user.sub,
          voucherId: voucherId
        }
      }
    });

    if (existingCustomerVoucher) {
      throw new BadRequestException('You have already saved this voucher');
    }

    // Check if the user has enough points to save the voucher
    const customer = await this.prisma.customer.findUnique({
      where: { userId: user.sub }
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // if (customer.points < voucher.pointCost) {
    //   throw new BadRequestException('Not enough points to save this voucher');
    // }

    const [customerVoucher, _] = await this.prisma.$transaction([
      this.prisma.customerVoucher.create({
        data: {
          userId: user.sub,
          voucherId: voucherId,
        }
      }),
      this.prisma.customer.update({
        where: { userId: user.sub },
        data: { points: { decrement: voucher.pointCost } }
      })
    ]);

    return customerVoucher;
  }

  async getSavedVouchers(user: IUser): Promise<Voucher[]> {
    const savedVouchers = await this.prisma.customerVoucher.findMany({
      where: {
        userId: user.sub, 
      },
      include: {
        voucher: true, 
      },
    });
  

    return savedVouchers.map((savedVoucher) => savedVoucher.voucher);
  }
  
  
}

