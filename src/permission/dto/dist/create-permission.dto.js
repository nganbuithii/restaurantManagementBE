"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePermissionDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreatePermissionDto = /** @class */ (function () {
    function CreatePermissionDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: "action can not empty " }),
        class_validator_1.IsString()
    ], CreatePermissionDto.prototype, "apiPath");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: "resource can not empty " }),
        class_validator_1.IsString()
    ], CreatePermissionDto.prototype, "method");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: "resource can not empty " }),
        class_validator_1.IsString()
    ], CreatePermissionDto.prototype, "module");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: "description can not empty" }),
        class_validator_1.IsString()
    ], CreatePermissionDto.prototype, "description");
    return CreatePermissionDto;
}());
exports.CreatePermissionDto = CreatePermissionDto;
