import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"


export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Username can not empty' })
    username: string
    @MinLength(8)

    @ApiProperty()
    password: string

    @ApiProperty()
    @Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
        message: 'Phone number is not correct',
    })
    phone: string

    @ApiProperty()
    @IsEmail({}, { message: 'Email is not correct format' })
    email: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Fullname can not empty' })
    fullName: string
    // @IsNotEmpty({ message: 'Fullname can not empty' })
    @ApiProperty()
    avatar: string

}

export class LoginDto {
    @IsNotEmpty({ message: 'Username can not empty' })
    @ApiProperty()
    username:string

    @IsNotEmpty({ message: 'Password can not empty' })
    @ApiProperty()
    @MinLength(8)
    password:string

}