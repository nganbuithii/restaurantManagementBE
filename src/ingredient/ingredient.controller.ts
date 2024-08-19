import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/ingredient.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createIngredient(@Body() body: CreateIngredientDto, @Req() request: any) {
    try {
      const userId = request.user.sub;

      const newIngredient = await this.ingredientService.create(body, userId);
      return newIngredient;
    } catch (error) {
      console.error('Error details:', error);
      throw new BadRequestException('Error creating ingredient');
    }
  }

}
