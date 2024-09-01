import { Controller, Get, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ResponseMessage } from 'decorators/customize';
import { InventoryFilterType, InventoryPaginationResponseType } from './dto/inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ResponseMessage("Get inventory list")
  getAll(@Query() params: InventoryFilterType): Promise<InventoryPaginationResponseType> {
    return this.inventoryService.getAll(params);
  }

}
