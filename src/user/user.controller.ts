import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserFilterType, UserpaginationResponseType } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Permissions } from 'decorators/permission';
import { PermissionsGuard } from 'guards/role.guard';



@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    // @Permissions('create:user')  // Quyền yêu cầu để tạo người dùng
    // @UseGuards(PermissionsGuard)
    create(@Body() body: CreateUserDto): Promise<Omit<User, 'password'>> {
        return this.userService.create(body);
    }

    @Get()
    getAll(@Query() params: UserFilterType): Promise<UserpaginationResponseType> {
        return this.userService.getAll(params);
    }

    @Get(':id')
    getDetail(@Param('id', ParseIntPipe) id: number):Promise<Omit<User, 'password'>> {
        return this.userService.getDetail(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto): Promise<User> {
        return this.userService.update(id, data);
    }


   
}
