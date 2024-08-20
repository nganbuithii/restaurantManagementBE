"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateMenuItemDto = void 0;
var class_validator_1 = require("class-validator");
var CreateMenuItemDto = /** @class */ (function () {
    function CreateMenuItemDto() {
    }
    __decorate([
        class_validator_1.IsString({ message: 'Name must be a string' }),
        class_validator_1.IsNotEmpty({ message: "name menu item can not empty" })
    ], CreateMenuItemDto.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty({ message: "price menu item can not empty" })
    ], CreateMenuItemDto.prototype, "price");
    return CreateMenuItemDto;
}());
exports.CreateMenuItemDto = CreateMenuItemDto;
