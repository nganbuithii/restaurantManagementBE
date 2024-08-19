import { IsString, IsNotEmpty, IsBoolean, IsDate, IsNumber, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

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


    @IsIn(['available', 'out_of_stock', 'pending'], {
        message: 'Status must be one of the following: available, out_of_stock, pending',
    })
    status?: string;
}
