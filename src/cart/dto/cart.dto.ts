// src/cart/dto/cart.dto.ts
import { IsInt, IsPositive } from 'class-validator';

export class AddToCartDto {
    @IsInt()
    menuItemId: number;

    @IsInt()
    @IsPositive()
    quantity: number;
}
// src/cart/dto/cart.dto.ts
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
    message?: string;
}
