import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ReversationsService } from './reversations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { CreateReservationDto, UpdateReservationDto ,ReservationFilterType, ReservationPaginationResponseType, ReservationStatus } from './dto/reversations.dto';
import { IUser } from 'interfaces/user.interface';
import { Reservation } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Reservation")
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
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("get all menu item with pagination")
  getAll(@Query() params: ReservationFilterType): Promise<ReservationPaginationResponseType> {
    return this.reversationsService.getAll(params);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" get detail reservcation by id")
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
    return this.reversationsService.getDetail(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(" update menu item by id")
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateReservationDto , @CurrentUser() user:IUser): Promise<Reservation> {
        return this.reversationsService.update(id, data, user);
    }

    @Patch(':id/change-status')
    @UseGuards(JwtAuthGuard)
    @ResponseMessage("update reservation status by id")
    changeReservationStatus(
      @Param('id', ParseIntPipe) id: number, 
      @Body('status') status: ReservationStatus, 
      @CurrentUser() user: IUser
    ): Promise<Reservation> {
      return this.reversationsService.changeStatus(id, status, user);
    }
    
}
