import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVoucherDto, UpdateVoucherDto, VoucherFilterType, VoucherPaginationResponseType } from './dto/voucher.dto';
import { IUser } from 'interfaces/user.interface';
import { Order, Voucher } from '@prisma/client';
import { generateVoucherCode } from 'helper/voucher.helper';
@Injectable()
export class VouchersService {
  constructor(private prisma: PrismaService) { }

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
  

}
