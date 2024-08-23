import { Menu } from "@prisma/client";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateMenuDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: "name menu  can not empty" })
    name: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
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