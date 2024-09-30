import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, CartResponseDto } from './dto/cart.dto';
import { CurrentUser } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';
import { Cart } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCart(@CurrentUser() user: IUser): Promise<CartResponseDto> {
    return await this.cartService.getCart(user);
  }

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @CurrentUser() user: IUser,
    @Body() addToCartDto: AddToCartDto,
  ): Promise<CartResponseDto> {
    return await this.cartService.addToCart(user, addToCartDto);
  }

  @Delete('remove/:itemId')
  @UseGuards(JwtAuthGuard)
  async removeFromCart(
    @CurrentUser() user: IUser,
    @Param('itemId') itemId: number,
  ): Promise<CartResponseDto> {
    return await this.cartService.removeFromCart(user, itemId);
  }
}
