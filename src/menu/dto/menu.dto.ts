import { ApiProperty } from "@nestjs/swagger";
import { Menu } from "@prisma/client";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateMenuDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: "name menu  can not empty" })
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty()
    isActive?: boolean;

    @IsOptional()
    @ApiProperty()
    @IsArray({ message: 'Menu item IDs must be an array of numbers' })
    @IsNumber({}, { each: true, message: 'Each menu item ID must be a number' })
    menuItemIds?: number[]; // Danh sách ID món ăn
}


export interface MenuFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
}

export interface MenuPaginationResponseType {
    data: Menu[]
    total: number
    currentPage: number
    itemsPerPage: number
}

export class UpdateMenuDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: "name menu item can not empty" })
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: 'Menu items array cannot be empty' })
    @ApiProperty()
    menuItems?: number[];
   
}  