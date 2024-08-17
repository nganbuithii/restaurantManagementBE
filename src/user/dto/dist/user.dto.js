"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
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
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        class_validator_1.IsEmail({}, { message: 'Email is not correct format' })
    ], CreateUserDto.prototype, "email");
    __decorate([
        class_validator_1.Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
            message: 'phone number is not correct'
        })
    ], CreateUserDto.prototype, "phone");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Username can not empty' })
    ], CreateUserDto.prototype, "username");
    __decorate([
        class_validator_1.MinLength(8)
    ], CreateUserDto.prototype, "password");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Role can not empty' })
    ], CreateUserDto.prototype, "roleId");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Fullname can not empty' })
    ], CreateUserDto.prototype, "fullName");
    __decorate([
        class_validator_1.IsOptional()
    ], CreateUserDto.prototype, "avatar");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEmail({}, { message: 'Email is not correct format' })
    ], UpdateUserDto.prototype, "email");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
            message: 'phone number is not correct'
        })
    ], UpdateUserDto.prototype, "phone");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNotEmpty({ message: 'Username can not empty' })
    ], UpdateUserDto.prototype, "username");
    __decorate([
        class_validator_1.IsOptional()
    ], UpdateUserDto.prototype, "fullName");
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
var UserDto = /** @class */ (function () {
    function UserDto() {
    }
    __decorate([
        class_transformer_1.Expose()
    ], UserDto.prototype, "id");
    __decorate([
        class_transformer_1.Expose()
    ], UserDto.prototype, "email");
    __decorate([
        class_transformer_1.Expose()
    ], UserDto.prototype, "fullName");
    __decorate([
        class_transformer_1.Expose()
    ], UserDto.prototype, "phone");
    __decorate([
        class_transformer_1.Expose()
    ], UserDto.prototype, "username");
    __decorate([
        class_transformer_1.Expose()
    ], UserDto.prototype, "avatar");
    __decorate([
        class_transformer_1.Expose()
    ], UserDto.prototype, "roleId");
    __decorate([
        class_transformer_1.Expose()
    ], UserDto.prototype, "createdAt");
    __decorate([
        class_transformer_1.Expose()
    ], UserDto.prototype, "updatedAt");
    UserDto = __decorate([
        class_transformer_1.Exclude()
    ], UserDto);
    return UserDto;
}());
exports.UserDto = UserDto;
