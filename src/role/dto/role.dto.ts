import { IsNotEmpty } from "class-validator"
import { IsArray, IsNumber, ArrayNotEmpty } from 'class-validator';

export class CreateRoleDto {

    @IsNotEmpty({ message: 'Role name can not empty' })
    name: string

}

export class UpdateRolePermissionsDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    permissionIds: number[];
}