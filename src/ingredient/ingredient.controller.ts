import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto, IngredientFilterType, IngredientPaginationResponseType, UpdateIngredientDto } from './dto/ingredient.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Ingredient } from '@prisma/client';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Ingredient")
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  createIngredient(@Body() body: CreateIngredientDto, @CurrentUser() user: IUser) {

    return this.ingredientService.create(body, user);

  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ResponseMessage(" get all ingredient ")
  getAll(@Query() params: IngredientFilterType): Promise<IngredientPaginationResponseType> {
    return this.ingredientService.getAll(params);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" get detail ingredient by id")
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<Ingredient> {
    return this.ingredientService.getDetail(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" update ingredient")
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateIngredientDto,
    @CurrentUser() user: IUser): Promise<Ingredient> {
    return this.ingredientService.update(id, data, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: IUser): Promise<Ingredient> {

    return this.ingredientService.delete(id, user);
  }


}
