import { Permission } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"

export class CreatePermissionDto {
    @IsNotEmpty({ message: "action can not empty " })
    @IsString()
    action: string
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