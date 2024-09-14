"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateReservationDto = exports.CreateReservationDto = exports.ReservationStatus = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["PENDING"] = "PENDING";
    ReservationStatus["CONFIRMED"] = "CONFIRMED";
    ReservationStatus["CANCELLED"] = "CANCELLED";
    ReservationStatus["COMPLETED"] = "COMPLETED";
    ReservationStatus["FAILED"] = "FAILED";
    ReservationStatus["RESCHEDULED"] = "RESCHEDULED";
})(ReservationStatus = exports.ReservationStatus || (exports.ReservationStatus = {}));
var CreateReservationDto = /** @class */ (function () {
    function CreateReservationDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Start time cannot be empty' }),
        class_transformer_1.Type(function () { return Date; }),
        swagger_1.ApiProperty()
    ], CreateReservationDto.prototype, "time");
    __decorate([
        class_validator_1.IsNotEmpty({ message: 'Date Resevation cannot be empty' }),
        class_validator_1.IsDate({ message: 'dateTime must be a Date instance' }),
        class_transformer_1.Type(function () { return Date; }),
        swagger_1.ApiProperty()
    ], CreateReservationDto.prototype, "date");
    __decorate([
        class_validator_1.IsEnum(ReservationStatus, { message: 'Status must be a valid enum value' }),
        class_validator_1.IsOptional(),
        swagger_1.ApiProperty({ "enum": ReservationStatus })
    ], CreateReservationDto.prototype, "status");
    __decorate([
        class_validator_1.IsInt(),
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Table ID cannot be empty' })
    ], CreateReservationDto.prototype, "tableId");
    __decorate([
        class_validator_1.IsArray({ message: 'Menu item IDs must be an array' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsInt({ each: true, message: 'Each menu item ID must be an integer' }),
        swagger_1.ApiProperty({ type: [Number], description: 'Array of menu item IDs' })
    ], CreateReservationDto.prototype, "menuItemIds");
    return CreateReservationDto;
}());
exports.CreateReservationDto = CreateReservationDto;
var UpdateReservationDto = /** @class */ (function () {
    function UpdateReservationDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Start time cannot be empty' }),
        class_validator_1.IsDate({ message: 'startTime must be a Date instance' }),
        class_transformer_1.Type(function () { return Date; })
    ], UpdateReservationDto.prototype, "startTime");
    __decorate([
        class_validator_1.IsOptional(),
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'End time cannot be empty' }),
        class_validator_1.IsDate({ message: 'endTime must be a Date instance' }),
        class_transformer_1.Type(function () { return Date; })
    ], UpdateReservationDto.prototype, "endTime");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Status cannot be empty' })
    ], UpdateReservationDto.prototype, "status");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsOptional(),
        swagger_1.ApiProperty()
    ], UpdateReservationDto.prototype, "tableId");
    __decorate([
        class_validator_1.IsInt(),
        class_validator_1.IsOptional(),
        swagger_1.ApiProperty()
    ], UpdateReservationDto.prototype, "orderId");
    return UpdateReservationDto;
}());
exports.UpdateReservationDto = UpdateReservationDto;
