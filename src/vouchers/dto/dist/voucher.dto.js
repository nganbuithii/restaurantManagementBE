"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateVoucherDto = exports.CreateVoucherDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateVoucherDto = /** @class */ (function () {
    function CreateVoucherDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Percent is required' }),
        class_validator_1.IsInt({ message: 'Percent must be an integer' }),
        class_validator_1.Min(1, { message: 'Percent must be at least 1' }),
        class_validator_1.Max(100, { message: 'Percent must be at most 100' }),
        swagger_1.ApiProperty()
    ], CreateVoucherDto.prototype, "percent");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Description is required' }),
        class_validator_1.IsString({ message: 'Description must be a string' }),
        swagger_1.ApiProperty()
    ], CreateVoucherDto.prototype, "description");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Start date is required' }),
        class_validator_1.IsDateString({}, { message: 'Start date must be a valid date' }),
        swagger_1.ApiProperty()
    ], CreateVoucherDto.prototype, "startDate");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'End date is required' }),
        class_validator_1.IsDateString({}, { message: 'End date must be a valid date' }),
        swagger_1.ApiProperty()
    ], CreateVoucherDto.prototype, "endDate");
    __decorate([
        class_validator_1.IsBoolean({ message: 'IsActive must be a boolean' }),
        swagger_1.ApiProperty()
    ], CreateVoucherDto.prototype, "isActive");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Status is required' }),
        class_validator_1.IsString({ message: 'Status must be a string' }),
        swagger_1.ApiProperty()
    ], CreateVoucherDto.prototype, "status");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Quantity is required' }),
        class_validator_1.IsInt({ message: 'Quantity must be an integer' }),
        swagger_1.ApiProperty(),
        class_validator_1.Min(1, { message: 'Quantity must be at least 1' })
    ], CreateVoucherDto.prototype, "quantity");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Point cost is required' }),
        class_validator_1.IsInt({ message: 'Point cost must be an integer' }),
        class_validator_1.Min(0, { message: 'Point cost must be at least 0' }),
        swagger_1.ApiProperty()
    ], CreateVoucherDto.prototype, "pointCost");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsOptional(),
        class_validator_1.IsInt({ message: 'Customer ID must be an integer' })
    ], CreateVoucherDto.prototype, "customerId");
    return CreateVoucherDto;
}());
exports.CreateVoucherDto = CreateVoucherDto;
var UpdateVoucherDto = /** @class */ (function () {
    function UpdateVoucherDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: 'Code must be a string' }),
        swagger_1.ApiProperty()
    ], UpdateVoucherDto.prototype, "code");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsInt({ message: 'Percent must be an integer' }),
        class_validator_1.Min(1, { message: 'Percent must be at least 1' }),
        class_validator_1.Max(100, { message: 'Percent must be at most 100' }),
        swagger_1.ApiProperty()
    ], UpdateVoucherDto.prototype, "percent");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: 'Description must be a string' }),
        swagger_1.ApiProperty()
    ], UpdateVoucherDto.prototype, "description");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsDateString({}, { message: 'Start date must be a valid date' }),
        swagger_1.ApiProperty()
    ], UpdateVoucherDto.prototype, "startDate");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsDateString({}, { message: 'End date must be a valid date' }),
        swagger_1.ApiProperty()
    ], UpdateVoucherDto.prototype, "endDate");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean({ message: 'IsActive must be a boolean' }),
        swagger_1.ApiProperty()
    ], UpdateVoucherDto.prototype, "isActive");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: 'Status must be a string' }),
        swagger_1.ApiProperty()
    ], UpdateVoucherDto.prototype, "status");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsInt({ message: 'Quantity must be an integer' }),
        class_validator_1.Min(1, { message: 'Quantity must be at least 1' }),
        swagger_1.ApiProperty()
    ], UpdateVoucherDto.prototype, "quantity");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsInt({ message: 'Point cost must be an integer' }),
        class_validator_1.Min(0, { message: 'Point cost must be at least 0' }),
        swagger_1.ApiProperty()
    ], UpdateVoucherDto.prototype, "pointCost");
    return UpdateVoucherDto;
}());
exports.UpdateVoucherDto = UpdateVoucherDto;
