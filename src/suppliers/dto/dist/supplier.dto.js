"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateSupplierDto = exports.CreateSupplierDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateSupplierDto = /** @class */ (function () {
    function CreateSupplierDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Name can not empty" }),
        class_validator_1.IsString(),
        swagger_1.ApiProperty()
    ], CreateSupplierDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Address can not empty" }),
        class_validator_1.IsString(),
        swagger_1.ApiProperty()
    ], CreateSupplierDto.prototype, "address");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Email can not empty" }),
        class_validator_1.IsEmail(),
        swagger_1.ApiProperty()
    ], CreateSupplierDto.prototype, "email");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean(),
        swagger_1.ApiProperty()
    ], CreateSupplierDto.prototype, "isActive");
    return CreateSupplierDto;
}());
exports.CreateSupplierDto = CreateSupplierDto;
var UpdateSupplierDto = /** @class */ (function () {
    function UpdateSupplierDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        swagger_1.ApiProperty(),
        class_validator_1.IsString()
    ], UpdateSupplierDto.prototype, "name");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        swagger_1.ApiProperty()
    ], UpdateSupplierDto.prototype, "address");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsEmail(),
        swagger_1.ApiProperty()
    ], UpdateSupplierDto.prototype, "email");
    return UpdateSupplierDto;
}());
exports.UpdateSupplierDto = UpdateSupplierDto;
