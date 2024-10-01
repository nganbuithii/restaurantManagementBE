import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddToCartDto {
    @IsInt()
    menuItemId: number;

    @IsInt()
    @IsPositive()
    quantity: number;
}
import { Cart, CartItem, MenuItem } from '@prisma/client';
export class CartResponseDto {
    cart: {
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        items: (
            CartItem & {
                menuItem: MenuItem;
            }
        )[];
    };
    totalItems: number;
    message?: string;
}

export class UpdateCartDto {
    @IsNumber()
    @IsNotEmpty()
    itemId: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}
