import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { WarehouseSlipsService } from './warehouse-slips.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { CreateWarehouseSlipDto } from './dto/warehouse-slip.dto';
import { IUser } from 'interfaces/user.interface';

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
}
