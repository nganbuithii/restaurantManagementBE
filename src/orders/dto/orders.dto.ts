import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

class OrderDetailDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    menuItemId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    quantity: number;
}

export class CreateOrderDto {
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    @ApiProperty()
    status: OrderStatus;

    // @IsNumber()
    // @IsNotEmpty()
    // totalPrice: number;

    @IsNumber()
    @ApiProperty()
    discountPrice: number;

    @IsArray()
    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => OrderDetailDto)
    details: OrderDetailDto[];
}


export interface OrderFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
}

export interface OrderPaginationResponseType {
    data: Order[]
    total: number
    currentPage: number
    itemsPerPage: number
}

export class UpdateOrderDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    status?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    totalPrice?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    discountPrice?: number;
}
export class OrderStatisticsDto {
    totalOrders: number;
    totalRevenue: number;
  }