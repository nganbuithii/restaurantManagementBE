import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto, UpdateRolePermissionsDto } from './dto/role.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from 'decorators/permission';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@ApiTags("Roles")
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() body: CreateRoleDto): Promise<Role> {
        return this.roleService.create(body);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getAll(): Promise<Role[]> {
        return this.roleService.getAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getDetail(@Param('id') id: string): Promise<Role> {
        return this.roleService.getById(Number(id));
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
        return this.roleService.update(Number(id),updateRoleDto);
    }


    @Post(':roleId/permissions')
    @RequirePermissions('ASSIGN_PERMISSION')
    async assignPermissionsToRole(
        @Param('roleId', ParseIntPipe) roleId: number,
        @Body() body: UpdateRolePermissionsDto
    ) {
        console.log('Received body:', body);
        return this.roleService.updateRolePermissions(roleId, body.permissionIds);
    }

    @Post(':id/status')
    @UseGuards(JwtAuthGuard)
    async changeStatus(@Param('id', ParseIntPipe) id: number): Promise<Role> {
        return this.roleService.changeStatus(id);
    }

}
