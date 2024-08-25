"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateFeedbackReplyDto = exports.UpdateFeedbackDto = exports.CreateFeedbackDto = void 0;
var class_validator_1 = require("class-validator");
var CreateFeedbackDto = /** @class */ (function () {
    function CreateFeedbackDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty({ message: " content  can not empty" }),
        class_validator_1.IsString({ message: "content must be a string" })
    ], CreateFeedbackDto.prototype, "content");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsInt(),
        class_validator_1.Min(1),
        class_validator_1.Max(5)
    ], CreateFeedbackDto.prototype, "rating");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], CreateFeedbackDto.prototype, "isActive");
    return CreateFeedbackDto;
}());
exports.CreateFeedbackDto = CreateFeedbackDto;
var UpdateFeedbackDto = /** @class */ (function () {
    function UpdateFeedbackDto() {
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: 'Name must be a string' }),
        class_validator_1.IsNotEmpty({ message: "name menu item can not empty" })
    ], UpdateFeedbackDto.prototype, "content");
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.Min(1),
        class_validator_1.Max(5)
    ], UpdateFeedbackDto.prototype, "rating");
    return UpdateFeedbackDto;
}());
exports.UpdateFeedbackDto = UpdateFeedbackDto;
var CreateFeedbackReplyDto = /** @class */ (function () {
    function CreateFeedbackReplyDto() {
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreateFeedbackReplyDto.prototype, "content");
    return CreateFeedbackReplyDto;
}());
exports.CreateFeedbackReplyDto = CreateFeedbackReplyDto;
