import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ReversationsService } from './reversations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { CreateReservationDto, ReservationFilterType, ReservationPaginationResponseType } from './dto/reversations.dto';
import { IUser } from 'interfaces/user.interface';

@Controller('reversations')
export class ReversationsController {
  constructor(private readonly reversationsService: ReversationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("create new menu item")
  createReversation(
    @Body() body: CreateReservationDto, 
  @CurrentUser() user: IUser,
  ) {
    return this.reversationsService.create(body, user);
  }


  @Get()
  // @UseGuards(JwtAuthGuard)
  @ResponseMessage("get all menu item with pagination")
  getAll(@Query() params: ReservationFilterType): Promise<ReservationPaginationResponseType> {
    return this.reversationsService.getAll(params);
  }
}
