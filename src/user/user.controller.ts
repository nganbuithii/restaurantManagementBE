import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserFilterType, UserpaginationResponseType } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() body: CreateUserDto): Promise<User> {
        return this.userService.create(body);
    }

    @Get()
    getAll(@Query() params: UserFilterType): Promise<UserpaginationResponseType> {
        return this.userService.getAll(params);
    }

    @Get(':id')
    getDetail(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getDetail(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto): Promise<User> {
        return this.userService.update(id, data);
    }

}
