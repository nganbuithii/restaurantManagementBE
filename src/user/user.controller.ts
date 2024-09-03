import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserFilterType, UserpaginationResponseType } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helper/config';
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from 'decorators/permission';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';



@ApiTags("Users")
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @RequirePermissions('CREATE_USER')
    create(@Body() body: CreateUserDto): Promise<Omit<User, 'password'>> {
        return this.userService.create(body);
    }

    @Get()
    @RequirePermissions('GET_USER')
    getAll(@Query() params: UserFilterType): Promise<UserpaginationResponseType> {
        return this.userService.getAll(params);
    }

    @Get(':id')
    @RequirePermissions('GET_USER')
    getDetail(@Param('id', ParseIntPipe) id: number): Promise<Omit<User, 'password'>> {
        return this.userService.getDetail(id);
    }

    @Patch(':id')
    @RequirePermissions('UPDATE_USER')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto): Promise<User> {
        return this.userService.update(id, data);
    }

    @Post('upload-avt')
    @UseGuards(JwtAuthGuard)
    @RequirePermissions('UPDATE_AVATAR_USER')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: storageConfig('avatar'),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname).toLowerCase();
            const allowedExtArr = ['.jpg', '.png', '.jpeg'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationErr = `Wrong extension type. Accepted types are: ${allowedExtArr.join(', ')}`;
                return cb(null, false);
            }
            cb(null, true);
        }
    }))
    async uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if (req.fileValidationErr) {
            throw new BadRequestException(req.fileValidationErr);
        }
        if (!file) {
            throw new BadRequestException('File is required');
        }
    
        console.log('File:', file);
        console.log('User:', req.user);
        console.log('Upload avatar');
    
        try {
            const updatedUser = await this.userService.updateAvt(req.user.sub, file);
            return updatedUser;
        } catch (error) {
            console.error('Error updating avatar:', error.message);
            throw new BadRequestException('Failed to update avatar');
        }
    }
    
    @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMessage(" delete user by id")
  deleteUser(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: IUser): Promise<void> {
    return this.userService.delete(id, user);
  }
}
