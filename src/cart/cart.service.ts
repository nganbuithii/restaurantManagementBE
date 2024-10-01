// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AddToCartDto, CartResponseDto, UpdateCartDto } from './dto/cart.dto';
import { IUser } from 'interfaces/user.interface';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }
    async getCart(user: IUser): Promise<CartResponseDto> {
        const cart = await this.prisma.cart.findUnique({
            where: { userId: user.sub },
            include: {
                items: {
                    include: {
                        menuItem: {
                            include: {
                                images: true,
                            },
                        },
                    },
                },
            },
        });

        if (!cart) {
            const newCart = await this.prisma.cart.create({
                data: {
                    userId: user.sub,
                    items: {
                        create: [],
                    },
                },
                include: {
                    items: {
                        include: {
                            menuItem: {
                                include: {
                                    images: true,
                                },
                            },
                        },
                    },
                },
            });

            return { cart: newCart, totalItems: 0 };
        }

        const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        return { cart, totalItems };
    }



    async addToCart(user: IUser, addToCartDto: AddToCartDto): Promise<CartResponseDto> {
        const { menuItemId, quantity } = addToCartDto;

        const menuItem = await this.prisma.menuItem.findUnique({
            where: { id: menuItemId },
        });

        if (!menuItem) {
            throw new NotFoundException('Menu item not found');
        }

        let cart = await this.prisma.cart.findUnique({
            where: { userId: user.sub },
        });

        if (!cart) {
            // Create cart if it doesn't exist
            cart = await this.prisma.cart.create({
                data: {
                    userId: user.sub,
                },
            });
        }

        // Check if the menu item already exists in the cart
        const existingCartItem = await this.prisma.cartItem.findUnique({
            where: {
                cartId_menuItemId: {
                    cartId: cart.id,
                    menuItemId: menuItemId,
                },
            },
        });

        if (existingCartItem) {
            await this.prisma.cartItem.update({
                where: {
                    cartId_menuItemId: {
                        cartId: cart.id,
                        menuItemId: menuItemId,
                    },
                },
                data: {
                    quantity: existingCartItem.quantity + quantity,
                },
            });
        } else {
            await this.prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    menuItemId: menuItemId,
                    quantity: quantity,
                },
            });
        }

        // Get the updated cart
        const updatedCart = await this.prisma.cart.findUnique({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });

        const totalItems = updatedCart.items.reduce((acc, item) => acc + item.quantity, 0);

        return { cart: updatedCart, totalItems, message: 'Item added to cart successfully' };
    }

    async removeFromCart(user: IUser, menuItemId: string): Promise<CartResponseDto> {
        const cart = await this.prisma.cart.findUnique({
            where: { userId: user.sub },
            include: {
                items: true,
            },
        });
        console.log("Cart", cart)
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        const menuItemIdInt = parseInt(menuItemId, 10);
        console.log("MenuOtem Int", menuItemIdInt)

        const cartItem = cart.items.find(item => item.menuItemId === menuItemIdInt);

        if (!cartItem) {
            throw new NotFoundException('Cart item not found or does not belong to the current cart');
        }

        await this.prisma.cartItem.delete({
            where: { id: cartItem.id },
        });

        const updatedCart = await this.prisma.cart.findUnique({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });

        const totalItems = updatedCart.items.reduce((acc, item) => acc + item.quantity, 0);

        return { cart: updatedCart, totalItems, message: 'Item removed from cart successfully' };
    }

    async updateCart(user: IUser, updateCartDto: UpdateCartDto): Promise<CartResponseDto> {
        const { itemId, quantity } = updateCartDto;
            const cart = await this.prisma.cart.findUnique({
            where: { userId: user.sub },
            include: { items: true }, 
        });
    console.log("Item Id", itemId)
    console.log("cart", cart)
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
    
        const cartItem = cart.items.find(item => item.menuItemId === itemId);
        if (!cartItem) {
            throw new NotFoundException('Cart item not found or does not belong to the current cart');
        }
    
        await this.prisma.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity: quantity },
        });
    
        const updatedCart = await this.prisma.cart.findUnique({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });
    
        const totalItems = updatedCart.items.reduce((acc, item) => acc + item.quantity, 0);
    
        return { cart: updatedCart, totalItems, message: 'Cart updated successfully' };
    }
    

}
