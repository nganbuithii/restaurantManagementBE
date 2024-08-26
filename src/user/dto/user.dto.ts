import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";
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
  @ApiProperty()
  email: string;

  @Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
    message: 'phone number is not correct',
  })
  @ApiProperty()
  phone?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Username can not empty' })
  username: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Role can not empty' })
  roleId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Fullname can not empty' })
  fullName:string;
  @ApiProperty()
  @IsOptional()
  avatar?: string; 
}


export interface UserFilterType {
  items_per_page?:number;
  page?:number;
  search?:string
}

export interface UserpaginationResponseType{
  data:UserDto[]
  total:number
  currentPage:number
  itemsPerPage:number
}



export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  @IsEmail({}, { message: 'Email is not correct format' })
  email: string;

  @ApiProperty()
  @IsOptional()
  @Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
    message: 'phone number is not correct',
  })
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'Username can not empty' })
  username: string;

  @ApiProperty()
  @IsOptional()
  fullName:string;

  @ApiProperty()
  @IsOptional()
  avatar:string;
}
@Exclude()
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  phone: string;

  @Expose()
  username: string;

  @Expose()
  avatar: string;

  @Expose()
  roleId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}