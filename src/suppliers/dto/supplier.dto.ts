import { Supplier } from '@prisma/client';
import { IsNotEmpty, IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateSupplierDto {
    @IsNotEmpty({message:"Name can not empty"})
    @IsString()
    name: string;

    @IsNotEmpty({message:"Address can not empty"})
    @IsString()
    address: string;

    @IsNotEmpty({message:"Email can not empty"})
    @IsEmail()
    email: string;

    @IsOptional()
    @IsBoolean()
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
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsEmail()
    email: string;
}