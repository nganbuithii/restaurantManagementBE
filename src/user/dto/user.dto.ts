import { User } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator"


// export class CreateUserDto{
//     @IsNotEmpty({ message: 'Username can not empty' })
//     username:string

//     @Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
//         message: 'phone number is not correct',
//     })
//     phone:string
//     @IsEmail({}, { message: 'Email is not correct format' })
//     email:string
//     @MinLength(8)
//     password:string
// }
// src/user/dto/user.dto.ts
export class CreateUserDto {
  @IsEmail({}, { message: 'Email is not correct format' })
  email: string;
  @Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
    message: 'phone number is not correct',
  })
  phone?: string;
  @IsNotEmpty({ message: 'Username can not empty' })
  username: string;
  @MinLength(8)
  password: string;
  @IsNotEmpty({ message: 'Role can not empty' })
  roleId: number;
  @IsNotEmpty({ message: 'Fullname can not empty' })
  fullName:string;
}


export interface UserFilterType {
  items_per_page?:number;
  page?:number;
  search?:string
}

export interface UserpaginationResponseType{
  data:User[]
  total:number
  currentPage:number
  itemsPerPage:number
}



export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Email is not correct format' })
  email: string;
  @IsOptional()
  @Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
    message: 'phone number is not correct',
  })
  phone?: string;
  @IsOptional()
  @IsNotEmpty({ message: 'Username can not empty' })
  username: string;

  
  @IsOptional()
  fullName:string;
}
