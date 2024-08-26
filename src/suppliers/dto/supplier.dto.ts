import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from '@prisma/client';
import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateSupplierDto {
    @IsNotEmpty({message:"Name can not empty"})
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty({message:"Address can not empty"})
    @IsString()
    @ApiProperty()
    address: string;

    @IsNotEmpty({message:"Email can not empty"})
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    isActive?: boolean;

}



export interface SupplierFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
}

export interface SupplierPaginationResponseType {
    data: Supplier[]
    total: number
    currentPage: number
    itemsPerPage: number
}

export class UpdateSupplierDto {
    @IsOptional()
    @ApiProperty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    address: string;

    @IsOptional()
    @IsEmail()
    @ApiProperty()
    email: string;
}