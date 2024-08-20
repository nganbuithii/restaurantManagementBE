import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMenuItemDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({message:"name menu item can not empty"})
    name: string;

    @IsNotEmpty({message:"price menu item can not empty"})
    price: number;
}