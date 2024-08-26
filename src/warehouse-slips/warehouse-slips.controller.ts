import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post,Delete, Query, UseGuards, Patch } from '@nestjs/common';
import { WarehouseSlipsService } from './warehouse-slips.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { CreateWarehouseSlipDto, UpdateWarehouseSlipDto, WarehouserSlipFilterType, WarehouseSlipPaginationResponseType } from './dto/warehouse-slip.dto';
import { IUser } from 'interfaces/user.interface';
import { WarehouseSlip } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("WarehouseSlip")
@Controller('warehouse-slips')
export class WarehouseSlipsController {
  constructor(private readonly warehouseSlipsService: WarehouseSlipsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("create new warehouse slip successfully")
  createVoucher(
    @Body() body: CreateWarehouseSlipDto,
    @CurrentUser() user: IUser) {
    return this.warehouseSlipsService.create(body, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Get all warehouse list")
  getAll(@Query() params: WarehouserSlipFilterType): Promise<WarehouseSlipPaginationResponseType> {
    return this.warehouseSlipsService.getAll(params);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" get detail warehouse slip by id")
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<WarehouseSlip> {
    return this.warehouseSlipsService.getById(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMessage("Delete warehouse slip by id is success")
  delete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user:IUser): Promise<void> {
    return this.warehouseSlipsService.delete(id, user);
  }

  @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ResponseMessage("Update warehouse slip by id")
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateWarehouseSlipDto, @CurrentUser() user:IUser): Promise<WarehouseSlip> {
      return this.warehouseSlipsService.update(id, data, user);
    }
}


