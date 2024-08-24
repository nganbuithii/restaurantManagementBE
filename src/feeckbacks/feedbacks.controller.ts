import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { FeeckbacksService } from './feedbacks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';
import { CreateFeedbackDto, FeedbackFilterType, FeedbackPaginationResponseType, UpdateFeedbackDto } from './dto/feecback.dto';
import { Feedback } from '@prisma/client';

@Controller('feedbacks')
export class FeeckbacksController {
  constructor(private readonly s: FeeckbacksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("create feedback successfully")
  createFeedback(
    @Body() body: CreateFeedbackDto, 
  @CurrentUser() user: IUser) {
    return this.s.create(body, user);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ResponseMessage("get feedbacks with pagination")
  getAll(@Query() params: FeedbackFilterType): Promise<FeedbackPaginationResponseType> {
    return this.s.getAll(params);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" get feedbacks by id")
  getDetail(@Param ('id', ParseIntPipe) id: number): Promise<Feedback> {
    return this.s.getDetail(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" update feedback by id")
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateFeedbackDto): Promise<Feedback> {
        return this.s.update(id, data);
    }


    @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMessage(" delete feedback by id")
    deleteMenuItem(@Param('id', ParseIntPipe) id: number, @CurrentUser() user:IUser): Promise<void> {
        return this.s.delete(id, user);
    }
}
