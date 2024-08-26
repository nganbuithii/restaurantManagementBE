"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginDto = exports.RegisterDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var RegisterDto = /** @class */ (function () {
    function RegisterDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Username can not empty' })
    ], RegisterDto.prototype, "username");
    __decorate([
        class_validator_1.MinLength(8),
        swagger_1.ApiProperty()
    ], RegisterDto.prototype, "password");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.Matches(/^(?:\+84|0)[3|5|7|8|9]\d{8}$/, {
            message: 'Phone number is not correct'
        })
    ], RegisterDto.prototype, "phone");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsEmail({}, { message: 'Email is not correct format' })
    ], RegisterDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Fullname can not empty' })
    ], RegisterDto.prototype, "fullName");
    __decorate([
        swagger_1.ApiProperty()
    ], RegisterDto.prototype, "avatar");
    return RegisterDto;
}());
exports.RegisterDto = RegisterDto;
var LoginDto = /** @class */ (function () {
    function LoginDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Username can not empty' }),
        swagger_1.ApiProperty()
    ], LoginDto.prototype, "username");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Password can not empty' }),
        swagger_1.ApiProperty(),
        class_validator_1.MinLength(8)
    ], LoginDto.prototype, "password");
    return LoginDto;
}());
exports.LoginDto = LoginDto;
