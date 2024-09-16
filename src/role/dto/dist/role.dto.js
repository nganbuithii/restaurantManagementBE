"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateRolePermissionsDto = exports.CreateRoleDto = void 0;
var class_validator_1 = require("class-validator");
var class_validator_2 = require("class-validator");
var CreateRoleDto = /** @class */ (function () {
    function CreateRoleDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Role name can not empty' })
    ], CreateRoleDto.prototype, "name");
    __decorate([
        class_validator_2.IsArray(),
        class_validator_2.ArrayNotEmpty({ message: 'Permission IDs cannot be empty' }),
        class_validator_2.IsNumber({}, { each: true, message: 'Each permission ID must be a number' })
    ], CreateRoleDto.prototype, "permissionIds");
    return CreateRoleDto;
}());
exports.CreateRoleDto = CreateRoleDto;
var UpdateRolePermissionsDto = /** @class */ (function () {
    function UpdateRolePermissionsDto() {
    }
    __decorate([
        class_validator_2.IsArray(),
        class_validator_2.ArrayNotEmpty(),
        class_validator_2.IsNumber({}, { each: true })
    ], UpdateRolePermissionsDto.prototype, "permissionIds");
    return UpdateRolePermissionsDto;
}());
exports.UpdateRolePermissionsDto = UpdateRolePermissionsDto;
