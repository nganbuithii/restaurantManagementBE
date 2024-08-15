import { Body, Controller, Post } from '@nestjs/common';
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
}
