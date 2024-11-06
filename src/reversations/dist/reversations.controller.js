"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ReversationsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("decorators/customize");
var swagger_1 = require("@nestjs/swagger");
var ReversationsController = /** @class */ (function () {
    function ReversationsController(reversationsService) {
        this.reversationsService = reversationsService;
    }
    ReversationsController.prototype.createReversation = function (body, user) {
        return this.reversationsService.create(body, user);
    };
    ReversationsController.prototype.getAll = function (params) {
        return this.reversationsService.getAll(params);
    };
    ReversationsController.prototype.getDetail = function (id) {
        return this.reversationsService.getDetail(id);
    };
    ReversationsController.prototype.update = function (id, data, user) {
        return this.reversationsService.update(id, data, user);
    };
    ReversationsController.prototype.changeReservationStatus = function (id, status, user) {
        return this.reversationsService.changeStatus(id, status, user);
    };
    ReversationsController.prototype.getAllReservationsByUser = function (user, month, year) {
        return this.reversationsService.getAllByUserId(user, month, year);
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("create new reversation"),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser())
    ], ReversationsController.prototype, "createReversation");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("get all menu item with pagination"),
        __param(0, common_1.Query())
    ], ReversationsController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage(" get detail reservcation by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], ReversationsController.prototype, "getDetail");
    __decorate([
        common_1.Patch(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage(" update menu item by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()), __param(2, customize_1.CurrentUser())
    ], ReversationsController.prototype, "update");
    __decorate([
        common_1.Patch(':id/change-status'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("update reservation status by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body('status')),
        __param(2, customize_1.CurrentUser())
    ], ReversationsController.prototype, "changeReservationStatus");
    __decorate([
        common_1.Post('/me'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage('get all reservations of a user'),
        __param(0, customize_1.CurrentUser()),
        __param(1, common_1.Query('month')),
        __param(2, common_1.Query('year'))
    ], ReversationsController.prototype, "getAllReservationsByUser");
    ReversationsController = __decorate([
        swagger_1.ApiTags("Reservation"),
        common_1.Controller('reversations')
    ], ReversationsController);
    return ReversationsController;
}());
exports.ReversationsController = ReversationsController;
