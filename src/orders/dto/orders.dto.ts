import { Order } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

class OrderDetailDto {
    @IsNumber()
    @IsNotEmpty()
    menuItemId: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDto {
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;

    // @IsNumber()
    // @IsNotEmpty()
    // totalPrice: number;

    @IsNumber()
    discountPrice: number;

    @IsArray()
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
    status?: string;

    @IsOptional()
    @IsNumber()
    totalPrice?: number;

    @IsOptional()
    @IsNumber()
    discountPrice?: number;
}