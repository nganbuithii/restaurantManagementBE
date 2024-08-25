import { WarehouseSlip } from '@prisma/client';

import { IsNotEmpty, IsString, IsInt, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class WarehouseSlipDetailDto {
    @IsInt()
    @IsNotEmpty()
    ingredientId: number;

    @IsNotEmpty()
    quantity: number;
}
export enum WarehouseSlipType {
    IN = 'IN',
    OUT = 'OUT',
  }

export class CreateWarehouseSlipDto {
    @IsNotEmpty({message:"type can not empty"})
    type: string;

    @IsInt()
    @IsNotEmpty({message:"employee ID can not empty"})
    employeeId: number;

    @IsInt()
    @IsNotEmpty()
    supplierId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => WarehouseSlipDetailDto)
    details: WarehouseSlipDetailDto[];
}



export interface WarehouserSlipFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
}

export interface WarehouseSlipPaginationResponseType {
    data: WarehouseSlip[]
    total: number
    currentPage: number
    itemsPerPage: number
}