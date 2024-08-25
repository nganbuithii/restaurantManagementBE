import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVoucherDto, UpdateVoucherDto, VoucherFilterType, VoucherPaginationResponseType } from './dto/voucher.dto';
import { IUser } from 'interfaces/user.interface';
import { Voucher } from '@prisma/client';
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


  async getAll(params: VoucherFilterType): Promise<VoucherPaginationResponseType> {
    const { page = 1, items_per_page = 10, search } = params;
    const skip = (page - 1) * items_per_page;

    const where = search
      ? {
        OR: [
          { code: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
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
        createdBy: user.sub,
      },
    });

  
  }
}
