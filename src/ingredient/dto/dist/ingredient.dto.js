"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateIngredientDto = exports.CreateIngredientDto = void 0;
var class_validator_1 = require("class-validator");
var CreateIngredientDto = /** @class */ (function () {
    function CreateIngredientDto() {
    }
    __decorate([
        class_validator_1.IsString({ message: 'Name must be a string.' }),
        class_validator_1.IsNotEmpty({ message: 'Name is required.' })
    ], CreateIngredientDto.prototype, "name");
    __decorate([
        class_validator_1.IsString({ message: 'Unit must be a string.' }),
        class_validator_1.IsNotEmpty({ message: 'Unit is required.' })
    ], CreateIngredientDto.prototype, "unit");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Product Date is required.' })
    ], CreateIngredientDto.prototype, "productDate");
    __decorate([
        class_validator_1.IsNumber({}, { message: 'Price must be a number.' }),
        class_validator_1.IsNotEmpty({ message: 'Price is required.' })
    ], CreateIngredientDto.prototype, "price");
    __decorate([
        class_validator_1.IsIn(['available', 'out_of_stock', 'pending'], {
            message: 'Status must be one of the following: available, out_of_stock, pending'
        })
    ], CreateIngredientDto.prototype, "status");
    return CreateIngredientDto;
}());
exports.CreateIngredientDto = CreateIngredientDto;
var UpdateIngredientDto = /** @class */ (function () {
    function UpdateIngredientDto() {
    }
    __decorate([
        class_validator_1.IsString({ message: 'Name must be a string.' }),
        class_validator_1.IsOptional()
    ], UpdateIngredientDto.prototype, "name");
    __decorate([
        class_validator_1.IsString({ message: 'Unit must be a string.' }),
        class_validator_1.IsOptional()
    ], UpdateIngredientDto.prototype, "unit");
    __decorate([
        class_validator_1.IsNumber({}, { message: 'Price must be a number.' }),
        class_validator_1.IsOptional()
    ], UpdateIngredientDto.prototype, "price");
    __decorate([
        class_validator_1.IsIn(['available', 'out_of_stock', 'pending'], {
            message: 'Status must be one of the following: available, out_of_stock, pending'
        }),
        class_validator_1.IsOptional()
    ], UpdateIngredientDto.prototype, "status");
    return UpdateIngredientDto;
}());
exports.UpdateIngredientDto = UpdateIngredientDto;
