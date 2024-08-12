import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"


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
    email: string;
    phone?: string;
    username: string;
    password: string;
    roleId: number; // hoặc tùy thuộc vào cách bạn muốn chỉ định role
  }
  