"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateReservationDto = exports.CreateReservationDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreateReservationDto = /** @class */ (function () {
    function CreateReservationDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Start time cannot be empty' }),
        class_validator_1.IsDate({ message: 'startTime must be a Date instance' }),
        class_transformer_1.Type(function () { return Date; })
    ], CreateReservationDto.prototype, "startTime");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'End time cannot be empty' }),
        class_validator_1.IsDate({ message: 'endTime must be a Date instance' }),
        class_transformer_1.Type(function () { return Date; })
    ], CreateReservationDto.prototype, "endTime");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty({ message: 'Status cannot be empty' })
    ], CreateReservationDto.prototype, "status");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsNotEmpty({ message: 'Table ID cannot be empty' })
    ], CreateReservationDto.prototype, "tableId");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Customer ID cannot be empty' })
    ], CreateReservationDto.prototype, "customerId");
    return CreateReservationDto;
}());
exports.CreateReservationDto = CreateReservationDto;
var UpdateReservationDto = /** @class */ (function () {
    function UpdateReservationDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNotEmpty({ message: 'Start time cannot be empty' }),
        class_validator_1.IsDate({ message: 'startTime must be a Date instance' }),
        class_transformer_1.Type(function () { return Date; })
    ], UpdateReservationDto.prototype, "startTime");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsNotEmpty({ message: 'End time cannot be empty' }),
        class_validator_1.IsDate({ message: 'endTime must be a Date instance' }),
        class_transformer_1.Type(function () { return Date; })
    ], UpdateReservationDto.prototype, "endTime");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty({ message: 'Status cannot be empty' })
    ], UpdateReservationDto.prototype, "status");
    return UpdateReservationDto;
}());
exports.UpdateReservationDto = UpdateReservationDto;
