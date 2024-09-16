import { ApiProperty } from "@nestjs/swagger";
import { Permission } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"

export class CreatePermissionDto {

    @ApiProperty()
    @IsNotEmpty({ message: "action can not empty " })
    @IsString()
    apiPath :string

    @ApiProperty()
    @IsNotEmpty({ message: "resource can not empty " })
    @IsString()
    method    :string 

    @ApiProperty()
    @IsNotEmpty({ message: "resource can not empty " })
    @IsString()
    module    :string 

    @ApiProperty()
    @IsNotEmpty({ message: "description can not empty" })
    @IsString()
    description: string

}
export interface PermissionFilterType {
    items_per_page?:number;
    page?:number;
    search?:string
  }

export interface PermissionPaginationResponseType {
    data: Permission[]
    total: number
    currentPage: number
    itemsPerPage: number
}