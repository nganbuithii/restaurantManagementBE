import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export enum ReservationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    RESCHEDULED = 'RESCHEDULED',
}

export class CreateReservationDto {
    @IsNotEmpty({ message: 'Start time cannot be empty' })
    @Type(() => Date)
    @ApiProperty()
    time: string;
  
    @IsNotEmpty({ message: 'Date Resevation cannot be empty' })
    @IsDate({ message: 'dateTime must be a Date instance' })
    @Type(() => Date)
    @ApiProperty()
    date: Date;

    @IsEnum(ReservationStatus, { message: 'Status must be a valid enum value' })
    @IsOptional()
    @ApiProperty({ enum: ReservationStatus })
    status: ReservationStatus;

    @IsInt()
    @ApiProperty()
    @IsNotEmpty({ message: 'Table ID cannot be empty' })
    tableId: number;

    @IsArray({ message: 'Menu item IDs must be an array' })
    @IsOptional()
    @IsInt({ each: true, message: 'Each menu item ID must be an integer' })
    @ApiProperty({ type: [Number], description: 'Array of menu item IDs' })
    menuItemIds: number[];
}

export interface ReservationFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
}export interface ReservationPaginationResponseType {
    data: {
        id: number;
        time: string; 
        date: Date;   
        status: string;
        userId: number; 
    }[];
    total: number;
    currentPage: number;
    itemsPerPage: number;
}

export class UpdateReservationDto {
    @IsOptional()
    @ApiProperty()
    @IsNotEmpty({ message: 'Start time cannot be empty' })
    @IsDate({ message: 'startTime must be a Date instance' })
    @Type(() => Date)
    startTime: Date;
  
    @IsOptional()
    @ApiProperty()
    @IsNotEmpty({ message: 'End time cannot be empty' })
    @IsDate({ message: 'endTime must be a Date instance' })
    @Type(() => Date)
    endTime: Date;

    @IsOptional()
    @IsString()
    @ApiProperty()
    @IsNotEmpty({ message: 'Status cannot be empty' })
    status: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    tableId: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    orderId: number;

    // @IsNotEmpty({ message: 'Customer ID cannot be empty' })
    // customerId: number;
}