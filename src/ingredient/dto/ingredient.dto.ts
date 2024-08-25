import { IsString, IsNotEmpty, IsBoolean, IsDate, IsNumber, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { Ingredient } from '@prisma/client';

export class CreateIngredientDto {
    @IsString({ message: 'Name must be a string.' })
    @IsNotEmpty({ message: 'Name is required.' })
    name: string;

    @IsString({ message: 'Unit must be a string.' })
    @IsNotEmpty({ message: 'Unit is required.' })
    unit: string;

    // @IsDate({ message: 'Product Date must be a valid date.' })
    // @Type(() => Date)
    @IsNotEmpty({ message: 'Product Date is required.' })
    productDate: Date;

    @IsNumber({}, { message: 'Price must be a number.' })
    @IsNotEmpty({ message: 'Price is required.' })
    price: number;

    @IsNumber({}, { message: 'quantity ingredient in inventory must be a number.' })
    quantity: number;


    @IsIn(['available', 'out_of_stock', 'pending'], {
        message: 'Status must be one of the following: available, out_of_stock, pending',
    })
    status?: string;
}



export interface IngredientFilterType {
    items_per_page?:number;
    page?:number;
    search?:string
    isActive?:string
  }
  
  export interface IngredientPaginationResponseType{
    data:Ingredient[]
    total:number
    currentPage:number
    itemsPerPage:number
  }

  export class UpdateIngredientDto {
    @IsString({ message: 'Name must be a string.' })
    @IsOptional()
        name: string;

    @IsString({ message: 'Unit must be a string.' })
    @IsOptional()
    unit: string;

    

    @IsNumber({}, { message: 'Price must be a number.' })
    @IsOptional()
    price: number;


    @IsIn(['available', 'out_of_stock', 'pending'], {
        message: 'Status must be one of the following: available, out_of_stock, pending',
    })
    @IsOptional()
    status?: string;


    
  }