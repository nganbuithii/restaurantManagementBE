import { ApiProperty } from '@nestjs/swagger';
import { Voucher } from '@prisma/client';
import { IsNotEmpty, IsString, IsInt, IsBoolean, IsDateString, Min, Max, IsOptional } from 'class-validator';

export class CreateVoucherDto {

    @IsNotEmpty({ message: 'Percent is required' })
    @IsInt({ message: 'Percent must be an integer' })
    @Min(1, { message: 'Percent must be at least 1' })
    @Max(100, { message: 'Percent must be at most 100' })
    @ApiProperty()
    percent: number;

    @IsNotEmpty({ message: 'Description is required' })
    @IsString({ message: 'Description must be a string' })
    @ApiProperty()
    description: string;

    @IsNotEmpty({ message: 'Start date is required' })
    @IsDateString({}, { message: 'Start date must be a valid date' })
    @ApiProperty()
    startDate: Date;

    @IsNotEmpty({ message: 'End date is required' })
    @IsDateString({}, { message: 'End date must be a valid date' })
    @ApiProperty()
    endDate: Date;

    @IsBoolean({ message: 'IsActive must be a boolean' })
    @ApiProperty()
    isActive: boolean;

    @IsNotEmpty({ message: 'Status is required' })
    @IsString({ message: 'Status must be a string' })
    @ApiProperty()
    status: string;


    @IsNotEmpty({ message: 'Quantity is required' })
    @IsInt({ message: 'Quantity must be an integer' })
    @ApiProperty()
    @Min(1, { message: 'Quantity must be at least 1' })
    quantity: number;

    @IsNotEmpty({ message: 'Point cost is required' })
    @IsInt({ message: 'Point cost must be an integer' })
    @Min(0, { message: 'Point cost must be at least 0' })
    @ApiProperty()
    pointCost: number;

    @ApiProperty()
    @IsOptional()
    @IsInt({ message: 'Customer ID must be an integer' })
    customerId: number;
}


export class UpdateVoucherDto {
    @IsOptional()
    @IsString({ message: 'Code must be a string' })
    @ApiProperty()
    code?: string;

    @IsOptional()
    @IsInt({ message: 'Percent must be an integer' })
    @Min(1, { message: 'Percent must be at least 1' })
    @Max(100, { message: 'Percent must be at most 100' })
    @ApiProperty()
    percent?: number;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    @ApiProperty()
    description?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Start date must be a valid date' })
    @ApiProperty()
    startDate?: Date;

    @IsOptional()
    @IsDateString({}, { message: 'End date must be a valid date' })
    @ApiProperty()
    endDate?: Date;

    @IsOptional()
    @IsBoolean({ message: 'IsActive must be a boolean' })
    @ApiProperty()
    isActive?: boolean;

    @IsOptional()
    @IsString({ message: 'Status must be a string' })
    @ApiProperty()
    status?: string;

    @IsOptional()
    @IsInt({ message: 'Quantity must be an integer' })
    @Min(1, { message: 'Quantity must be at least 1' })
    @ApiProperty()
    quantity?: number;

    @IsOptional()
    @IsInt({ message: 'Point cost must be an integer' })
    @Min(0, { message: 'Point cost must be at least 0' })
    @ApiProperty()
    pointCost?: number;
}



export interface VoucherFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
}

export interface VoucherPaginationResponseType {
    data: Voucher[]
    total: number
    currentPage: number
    itemsPerPage: number
}