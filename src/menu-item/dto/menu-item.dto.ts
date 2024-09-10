import { ApiProperty } from '@nestjs/swagger';
import { MenuItem } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMenuItemDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: "Name of the menu item cannot be empty" })
    @ApiProperty()
    name: string;

    @IsNotEmpty({ message: "Price of the menu item cannot be empty" })
    @ApiProperty()
    price: string;

    @IsOptional()
    @ApiProperty({ type: [Number], description: 'Array of ingredient IDs' })
    ingredientIds?: number[];
}


export interface MenuItemFilterType {
    items_per_page?: number;
    page?: number;
    search?: string
    isBestSeller?: boolean;
    menuId?: number | string; 
}

export interface MenuItemPaginationResponseType {
    data: MenuItem[]
    total: number
    currentPage: number
    itemsPerPage: number
}


export class UpdateMenuItemDto {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: "Name of the menu item cannot be empty" })
    @ApiProperty()
    name?: string;

    @IsOptional()
    @IsNumber({}, { message: "Price must be a number" })
    @IsNotEmpty({ message: "Price of the menu item cannot be empty" })
    @ApiProperty()
    price?: number;

    @IsOptional()
    // @IsNumber({}, { each: true, message: "Each ingredient ID must be a number" })
    @ApiProperty({ type: [Number], description: 'Array of ingredient IDs' })
    ingredientIds?: string[];
}