import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
    @IsDate({ message: 'startTime must be a Date instance' })
    @Type(() => Date)
    @ApiProperty()
    startTime: Date;
  
    @IsNotEmpty({ message: 'End time cannot be empty' })
    @IsDate({ message: 'endTime must be a Date instance' })
    @Type(() => Date)
    @ApiProperty()
    endTime: Date;

    @IsEnum(ReservationStatus, { message: 'Status must be a valid enum value' })
    @IsNotEmpty({ message: 'Status cannot be empty' })
    @ApiProperty({ enum: ReservationStatus })
    status: ReservationStatus;

    @IsInt()
    @ApiProperty()
    @IsNotEmpty({ message: 'Table ID cannot be empty' })
    tableId: number;

    @IsNotEmpty({ message: 'Customer ID cannot be empty' })
    @ApiProperty()
    customerId: number;
}

export interface ReservationFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
}
export interface ReservationPaginationResponseType {
    data: {
        id: number;
        startTime: Date;
        endTime: Date;
        status: string;   
        tableId: number;      
        customerId: number;   
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

    // @IsInt()
    // @IsNotEmpty({ message: 'Table ID cannot be empty' })
    // tableId: number;

    // @IsNotEmpty({ message: 'Customer ID cannot be empty' })
    // customerId: number;
}