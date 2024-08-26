import { WarehouseSlip } from '@prisma/client';

import { IsNotEmpty, IsString, IsInt, IsArray, ValidateNested, ArrayMinSize, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class WarehouseSlipDetailDto {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ingredientId: number;

    @IsNotEmpty()
    @ApiProperty()
    quantity: number;
}
export enum WarehouseSlipType {
    IN = 'IN',
    OUT = 'OUT',
  }

export class CreateWarehouseSlipDto {
    @IsNotEmpty({message:"type can not empty"})
    @ApiProperty()
    type: string;

    @IsInt()
    @IsNotEmpty({message:"employee ID can not empty"})
    @ApiProperty()
    employeeId: number;

    @IsInt()
    @ApiProperty()
    @IsNotEmpty()
    supplierId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @ApiProperty()
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

export class UpdateWarehouseSlipDto {




    @IsOptional()
    @IsInt()
    @ApiProperty()
    supplierId?: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @ApiProperty()
    @Type(() => WarehouseSlipDetailDto)
    details?: WarehouseSlipDetailDto[];
}