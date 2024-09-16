import { IsNotEmpty } from "class-validator"
import { IsArray, IsNumber, ArrayNotEmpty } from 'class-validator';

export class CreateRoleDto {

    @IsNotEmpty({ message: 'Role name can not empty' })
    name: string

    @IsArray()
    @ArrayNotEmpty({ message: 'Permission IDs cannot be empty' })
    @IsNumber({}, { each: true, message: 'Each permission ID must be a number' })
    permissionIds: number[];

}

export class UpdateRolePermissionsDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    permissionIds: number[];
}