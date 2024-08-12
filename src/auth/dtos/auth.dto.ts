import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"


export class RegisterDto {
    @IsNotEmpty({ message: 'Username không được để trống' })
    username: string
    @MinLength(8)
    password: string
    @Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
        message: 'Số điện thoại không hợp lệ',
    })
    phone: string
    @IsEmail({}, { message: 'Email is not correct format' })
    email: string
    @IsNotEmpty({ message: 'Họ và tên không được để trống' })
    fullName: string
    avatar: string

}

export class LoginDto {
    @IsNotEmpty({ message: 'Username can not empty' })
    username:string
    @IsNotEmpty({ message: 'Password can not empty' })
    @MinLength(8)
    password:string

}