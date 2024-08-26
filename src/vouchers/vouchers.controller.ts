import { Voucher } from '@prisma/client';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query,Param, UseGuards, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVoucherDto, UpdateVoucherDto, VoucherFilterType, VoucherPaginationResponseType } from './dto/voucher.dto';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from 'decorators/permission';
import { PermissionGuard } from 'src/auth/permissions.guard';


@ApiTags("Vouchers")
@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RequirePermissions('CREATE_VOUCHER')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ResponseMessage("create new voucher successfully")
  createVoucher(
    @Body() body: CreateVoucherDto,
    @CurrentUser() user: IUser) {
    return this.vouchersService.create(body, user);
  }

  @Get()
  @ResponseMessage("Get vouchers list")
  getAll(@Query() params: VoucherFilterType): Promise<VoucherPaginationResponseType> {
    return this.vouchersService.getAll(params);
  }

  @Get(':id')
  @ResponseMessage(" get detail menu item by id")
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<Voucher> {
    return this.vouchersService.getById(id)
  }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ResponseMessage("Update voucher by id")
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateVoucherDto, @CurrentUser() user:IUser): Promise<Voucher> {
      return this.vouchersService.update(id, data, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ResponseMessage("Delete voucher by id")
    delete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user:IUser): Promise<void> {
      return this.vouchersService.delete(id, user);
    }
    // @Get('customers/:customerId/vouchers')
    // @UseGuards(JwtAuthGuard)
    // @ResponseMessage("Get customer's vouchers")
    // getCustomerVouchers(@Param('customerId', ParseIntPipe) customerId: number): Promise<Voucher[]> {
    //   return this.vouchersService.getCustomerVouchers(customerId);
    // }




}



