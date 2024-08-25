import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IUser } from 'interfaces/user.interface';
import { CreateSupplierDto, SupplierFilterType, SupplierPaginationResponseType } from './dto/supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("create new supplier successfully")
  createVoucher(
    @Body() body: CreateSupplierDto,
    @CurrentUser() user: IUser) {
    return this.suppliersService.create(body, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Get all supplier list")
  getAll(@Query() params: SupplierFilterType): Promise<SupplierPaginationResponseType> {
    return this.suppliersService.getAll(params);
  }
}
