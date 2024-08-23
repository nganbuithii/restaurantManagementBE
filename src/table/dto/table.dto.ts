import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Table } from '@prisma/client';
export class CreateTableDto {
    @IsInt()
    @IsNotEmpty({ message: "number can not empty" })
    number: number;

    @IsInt()
    @IsNotEmpty({ message: "quantity seats can not empty" })
    seats: number;

   
}



export interface TableFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
}

export interface TablePaginationResponseType {
    data: Table[]
    total: number
    currentPage: number
    itemsPerPage: number
}

