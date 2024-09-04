"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateMenuItemDto = exports.CreateMenuItemDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateMenuItemDto = /** @class */ (function () {
    function CreateMenuItemDto() {
    }
    __decorate([
        class_validator_1.IsString({ message: 'Name must be a string' }),
        class_validator_1.IsNotEmpty({ message: "Name of the menu item cannot be empty" }),
        swagger_1.ApiProperty()
    ], CreateMenuItemDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "Price of the menu item cannot be empty" }),
        swagger_1.ApiProperty()
    ], CreateMenuItemDto.prototype, "price");
    __decorate([
        class_validator_1.IsOptional(),
        swagger_1.ApiProperty({ type: [Number], description: 'Array of ingredient IDs' })
    ], CreateMenuItemDto.prototype, "ingredientIds");
    return CreateMenuItemDto;
}());
exports.CreateMenuItemDto = CreateMenuItemDto;
var UpdateMenuItemDto = /** @class */ (function () {
    function UpdateMenuItemDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: 'Name must be a string' }),
        class_validator_1.IsNotEmpty({ message: "Name of the menu item cannot be empty" }),
        swagger_1.ApiProperty()
    ], UpdateMenuItemDto.prototype, "name");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber({}, { message: "Price must be a number" }),
        class_validator_1.IsNotEmpty({ message: "Price of the menu item cannot be empty" }),
        swagger_1.ApiProperty()
    ], UpdateMenuItemDto.prototype, "price");
    __decorate([
        class_validator_1.IsOptional()
        // @IsNumber({}, { each: true, message: "Each ingredient ID must be a number" })
        ,
        swagger_1.ApiProperty({ type: [Number], description: 'Array of ingredient IDs' })
    ], UpdateMenuItemDto.prototype, "ingredientIds");
    return UpdateMenuItemDto;
}());
exports.UpdateMenuItemDto = UpdateMenuItemDto;
