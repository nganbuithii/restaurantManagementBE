import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IUser } from 'interfaces/user.interface';
import { CreateSupplierDto, SupplierFilterType, SupplierPaginationResponseType, UpdateSupplierDto } from './dto/supplier.dto';
import { Supplier } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Suppliers")
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

  @Get(':id')
  @ResponseMessage(" get detail supplier by id")
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
    return this.suppliersService.getById(id)
  }
  @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ResponseMessage("Update supplier by id")
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateSupplierDto, @CurrentUser() user:IUser): Promise<Supplier> {
      return this.suppliersService.update(id, data, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ResponseMessage("Delete voucher by id")
    delete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user:IUser): Promise<void> {
      return this.suppliersService.delete(id, user);
    }
}
