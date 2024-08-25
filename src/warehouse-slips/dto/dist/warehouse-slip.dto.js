"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateWarehouseSlipDto = exports.WarehouseSlipType = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var WarehouseSlipDetailDto = /** @class */ (function () {
    function WarehouseSlipDetailDto() {
    }
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsNotEmpty()
    ], WarehouseSlipDetailDto.prototype, "ingredientId");
    __decorate([
        class_validator_1.IsNotEmpty()
    ], WarehouseSlipDetailDto.prototype, "quantity");
    return WarehouseSlipDetailDto;
}());
var WarehouseSlipType;
(function (WarehouseSlipType) {
    WarehouseSlipType["IN"] = "IN";
    WarehouseSlipType["OUT"] = "OUT";
})(WarehouseSlipType = exports.WarehouseSlipType || (exports.WarehouseSlipType = {}));
var CreateWarehouseSlipDto = /** @class */ (function () {
    function CreateWarehouseSlipDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: "type can not empty" })
    ], CreateWarehouseSlipDto.prototype, "type");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsNotEmpty({ message: "employee ID can not empty" })
    ], CreateWarehouseSlipDto.prototype, "employeeId");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsNotEmpty()
    ], CreateWarehouseSlipDto.prototype, "supplierId");
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.ValidateNested({ each: true }),
        class_validator_1.ArrayMinSize(1),
        class_transformer_1.Type(function () { return WarehouseSlipDetailDto; })
    ], CreateWarehouseSlipDto.prototype, "details");
    return CreateWarehouseSlipDto;
}());
exports.CreateWarehouseSlipDto = CreateWarehouseSlipDto;
