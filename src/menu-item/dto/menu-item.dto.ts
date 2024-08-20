import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMenuItemDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({message:"name menu item can not empty"})
    name: string;

    @IsNotEmpty({message:"price menu item can not empty"})
    price: number;

    // @IsOptional()
    // @IsString({ each: true })
    // ingredientIds?: number[]; // ID của các nguyên liệu liên quan
    ingredientQuantities: { ingredientId: number; quantity: number }[];
}