import { IsNotEmpty } from "class-validator"

export class CreateRoleDto {

    @IsNotEmpty({ message: 'Role name can not empty' })
    name: string

}