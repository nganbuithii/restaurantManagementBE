import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@prisma/client';
import { CreateRoleDto, UpdateRolePermissionsDto } from './dto/role.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from 'decorators/permission';

@ApiTags("Roles")
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


    @Post(':roleId/permissions')
@RequirePermissions('ASSIGN_PERMISSION')
async assignPermissionsToRole(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() body: UpdateRolePermissionsDto
) {
    console.log('Received body:', body);
    return this.roleService.updateRolePermissions(roleId, body.permissionIds);
}

}
