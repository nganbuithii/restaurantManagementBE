"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCartDto = exports.CartResponseDto = exports.AddToCartDto = void 0;
var class_validator_1 = require("class-validator");
var AddToCartDto = /** @class */ (function () {
    function AddToCartDto() {
    }
    __decorate([
        class_validator_1.IsInt()
    ], AddToCartDto.prototype, "menuItemId");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsPositive()
    ], AddToCartDto.prototype, "quantity");
    return AddToCartDto;
}());
exports.AddToCartDto = AddToCartDto;
var CartResponseDto = /** @class */ (function () {
    function CartResponseDto() {
    }
    return CartResponseDto;
}());
exports.CartResponseDto = CartResponseDto;
var UpdateCartDto = /** @class */ (function () {
    function UpdateCartDto() {
    }
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsNotEmpty()
    ], UpdateCartDto.prototype, "itemId");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsNotEmpty()
    ], UpdateCartDto.prototype, "quantity");
    return UpdateCartDto;
}());
exports.UpdateCartDto = UpdateCartDto;
