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
exports.FeeckbacksController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("decorators/customize");
var FeeckbacksController = /** @class */ (function () {
    function FeeckbacksController(s) {
        this.s = s;
    }
    FeeckbacksController.prototype.createFeedback = function (body, user) {
        return this.s.create(body, user);
    };
    FeeckbacksController.prototype.getAll = function (params) {
        return this.s.getAll(params);
    };
    FeeckbacksController.prototype.getDetail = function (id) {
        return this.s.getDetail(id);
    };
    FeeckbacksController.prototype.update = function (id, data) {
        return this.s.update(id, data);
    };
    FeeckbacksController.prototype.deleteMenuItem = function (id, user) {
        return this.s["delete"](id, user);
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("create feedback successfully"),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser())
    ], FeeckbacksController.prototype, "createFeedback");
    __decorate([
        common_1.Get()
        // @UseGuards(JwtAuthGuard)
        ,
        customize_1.ResponseMessage("get feedbacks with pagination"),
        __param(0, common_1.Query())
    ], FeeckbacksController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage(" get feedbacks by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], FeeckbacksController.prototype, "getDetail");
    __decorate([
        common_1.Patch(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage(" update feedback by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body())
    ], FeeckbacksController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
        customize_1.ResponseMessage(" delete feedback by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, customize_1.CurrentUser())
    ], FeeckbacksController.prototype, "deleteMenuItem");
    FeeckbacksController = __decorate([
        common_1.Controller('feedbacks')
    ], FeeckbacksController);
    return FeeckbacksController;
}());
exports.FeeckbacksController = FeeckbacksController;
