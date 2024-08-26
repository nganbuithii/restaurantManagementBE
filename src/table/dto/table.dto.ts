import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Table } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";
export class CreateTableDto {
    @IsInt()
    @ApiProperty()
    @IsNotEmpty({ message: "number can not empty" })
    number: number;

    @IsInt()
    @ApiProperty()
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

