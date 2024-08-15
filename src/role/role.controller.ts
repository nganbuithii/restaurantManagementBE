import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@prisma/client';
import { CreateRoleDto } from './dto/role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }
    @Post()
    create(@Body() body: CreateRoleDto): Promise<Role> {
        return this.roleService.create(body);
    }

    @Get()
    getAll(): Promise<Role[]> {
        return this.roleService.getAll();
    }

    @Get(':id')
    getDetail(@Param('id') id: string): Promise<Role> {
        return this.roleService.getById(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body('name') name: string): Promise<Role> {
        return this.roleService.update(Number(id), name);
    }

}
