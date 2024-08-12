import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"


export class RegisterDto {
    @IsNotEmpty({ message: 'Username can not empty' })
    username: string
    @MinLength(8)
    password: string
    @Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
        message: 'Phone number is not correct',
    })
    phone: string
    @IsEmail({}, { message: 'Email is not correct format' })
    email: string
    @IsNotEmpty({ message: 'Fullname can not empty' })
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