import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ResponseMessage } from 'decorators/customize';
import { InventoryFilterType, InventoryPaginationResponseType } from './dto/inventory.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ResponseMessage("Get inventory list")
  @UseGuards(JwtAuthGuard)
  getAll(@Query() params: InventoryFilterType): Promise<InventoryPaginationResponseType> {
    return this.inventoryService.getAll(params);
  }
  @Post('test-check-inventory')
  async testCheckInventoryLevels() {
    await this.inventoryService.checkInventoryLevels();
    return { message: 'Inventory check initiated' };
  }
}
