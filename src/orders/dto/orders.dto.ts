import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

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

    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;

    @IsNumber()
    discountPrice: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderDetailDto)
    details: OrderDetailDto[];
}