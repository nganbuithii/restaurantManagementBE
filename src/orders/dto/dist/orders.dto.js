"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateOrderDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
var OrderDetailDto = /** @class */ (function () {
    function OrderDetailDto() {
    }
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsNotEmpty()
    ], OrderDetailDto.prototype, "menuItemId");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsNotEmpty()
    ], OrderDetailDto.prototype, "quantity");
    return OrderDetailDto;
}());
var CreateOrderDto = /** @class */ (function () {
    function CreateOrderDto() {
    }
    __decorate([
        class_validator_1.IsEnum(OrderStatus),
        class_validator_1.IsNotEmpty()
    ], CreateOrderDto.prototype, "status");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsNotEmpty()
    ], CreateOrderDto.prototype, "totalPrice");
    __decorate([
        class_validator_1.IsNumber()
    ], CreateOrderDto.prototype, "discountPrice");
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.ValidateNested({ each: true }),
        class_transformer_1.Type(function () { return OrderDetailDto; })
    ], CreateOrderDto.prototype, "details");
    return CreateOrderDto;
}());
exports.CreateOrderDto = CreateOrderDto;
