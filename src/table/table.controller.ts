import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { CreateTableDto, TableFilterType, TablePaginationResponseType } from './dto/table.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IUser } from 'interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { Table } from '@prisma/client';

@ApiTags("Table")
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @UseGuards(JwtAuthGuard)
  @ResponseMessage("create new table")
  createTable(
    @Body() body: CreateTableDto, 
  @CurrentUser() user: IUser){
    return this.tableService.create(body, user);
  }


  @Get()
  // @UseGuards(JwtAuthGuard)
  @ResponseMessage("get all table with pagination")
  getAll(@Query() params: TableFilterType): Promise<TablePaginationResponseType> {
    return this.tableService.getAll(params);
  }

    
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMessage(" delete table by id")
    deleteTable(@Param('id', ParseIntPipe) id: number, @CurrentUser() user:IUser): Promise<void> {
        return this.tableService.delete(id, user);
    }


    @Post('available')
async getAvailableTables(
  @Body('date') date: string,
  @Body('time') time: string
): Promise<Table[]> {
  // Gọi service để kiểm tra các bàn trống
  return this.tableService.getAvailableTables(date, time);
}

    
}
