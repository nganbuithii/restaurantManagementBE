import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, PermissionFilterType, PermissionPaginationResponseType } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { CurrentUser, ResponseMessage } from 'decorators/customize';
import { IUser } from 'interfaces/user.interface';
import { Permission } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags("Permissions")
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  @ResponseMessage("create permission")
  @UseGuards(JwtAuthGuard)
  create(@Body() createPermissionDto: CreatePermissionDto, @CurrentUser() user: IUser) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("get all permissions")
  getAll(@Query() params: PermissionFilterType): Promise<PermissionPaginationResponseType> {
    return this.permissionService.getAll(params);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getDetail(@Param('id', ParseIntPipe) id: number): Promise<Permission> {
    return this.permissionService.getDetail(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("update permission")
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { action?: string; description?: string }
  ): Promise<Permission> {
    return this.permissionService.update(id, data);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.permissionService.remove(id);
  }
  @Post('all')
  async getAllPermissions(): Promise<Permission[]> {
    return this.permissionService.getAllPermissions();
  }
}
