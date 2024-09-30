// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AddToCartDto, CartResponseDto } from './dto/cart.dto';
import { IUser } from 'interfaces/user.interface';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Lấy giỏ hàng của người dùng
     * @param user 
     * @returns CartResponseDto
     */
    async getCart(user: IUser): Promise<CartResponseDto> {
        const cart = await this.prisma.cart.findUnique({
            where: { userId: user.sub },
            include: {
                items: {
                    include: {
                        menuItem: true, // Giả sử bạn muốn lấy thông tin chi tiết của menuItem
                    },
                },
            },
        });

        if (!cart) {
            // Nếu người dùng chưa có giỏ hàng, có thể tạo một giỏ hàng trống
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
                            menuItem: true,
                        },
                    },
                },
            });

            return { cart: newCart };
        }

        return { cart };
    }

    /**
     * Thêm món ăn vào giỏ hàng
     * @param user 
     * @param addToCartDto 
     * @returns CartResponseDto
     */
    async addToCart(user: IUser, addToCartDto: AddToCartDto): Promise<CartResponseDto> {
        const { menuItemId, quantity } = addToCartDto;

        // Kiểm tra xem menuItem có tồn tại không
        const menuItem = await this.prisma.menuItem.findUnique({
            where: { id: menuItemId },
        });

        if (!menuItem) {
            throw new NotFoundException('Menu item not found');
        }

        // Kiểm tra xem người dùng đã có giỏ hàng chưa
        let cart = await this.prisma.cart.findUnique({
            where: { userId: user.sub },
        });

        if (!cart) {
            // Tạo giỏ hàng nếu chưa có
            cart = await this.prisma.cart.create({
                data: {
                    userId: user.sub,
                },
            });
        }

        // Kiểm tra xem món ăn đã tồn tại trong giỏ hàng chưa
        const existingCartItem = await this.prisma.cartItem.findUnique({
            where: {
                cartId_menuItemId: {
                    cartId: cart.id,
                    menuItemId: menuItemId,
                },
            },
        });

        if (existingCartItem) {
            // Nếu đã tồn tại, cập nhật số lượng
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
            // Nếu chưa tồn tại, tạo mới cartItem
            await this.prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    menuItemId: menuItemId,
                    quantity: quantity,
                },
            });
        }

        // Lấy lại giỏ hàng sau khi thêm
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

        return { cart: updatedCart, message: 'Item added to cart successfully' };
    }

    /**
     * Xóa món ăn khỏi giỏ hàng
     * @param user 
     * @param itemId 
     * @returns CartResponseDto
     */
    async removeFromCart(user: IUser, itemId: number): Promise<CartResponseDto> {
        // Kiểm tra xem người dùng có giỏ hàng không
        const cart = await this.prisma.cart.findUnique({
            where: { userId: user.sub },
            include: {
                items: true,
            },
        });

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        // Kiểm tra xem cartItem có tồn tại trong giỏ hàng không
        const cartItem = await this.prisma.cartItem.findUnique({
            where: {
                id: itemId,
            },
        });

        if (!cartItem || cartItem.cartId !== cart.id) {
            throw new NotFoundException('Cart item not found');
        }

        // Xóa cartItem
        await this.prisma.cartItem.delete({
            where: { id: itemId },
        });

        // Lấy lại giỏ hàng sau khi xóa
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

        return { cart: updatedCart, message: 'Item removed from cart successfully' };
    }
}
