import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto, IngredientFilterType, IngredientPaginationResponseType, UpdateIngredientDto } from './dto/ingredient.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Ingredient } from '@prisma/client';
import { ResponseMessage } from 'decorators/customize';

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

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query() params: IngredientFilterType): Promise<IngredientPaginationResponseType> {
      return this.ingredientService.getAll(params);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<Ingredient> {
      return this.ingredientService.getDetail(id)
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  @ResponseMessage(" update ingredient")
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateIngredientDto): Promise<Ingredient> {
        return this.ingredientService.update(id, data);
    }




}
