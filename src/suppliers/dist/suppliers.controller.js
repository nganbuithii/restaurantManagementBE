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
exports.SuppliersController = void 0;
var common_1 = require("@nestjs/common");
var customize_1 = require("decorators/customize");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var swagger_1 = require("@nestjs/swagger");
var SuppliersController = /** @class */ (function () {
    function SuppliersController(suppliersService) {
        this.suppliersService = suppliersService;
    }
    SuppliersController.prototype.createVoucher = function (body, user) {
        return this.suppliersService.create(body, user);
    };
    SuppliersController.prototype.getAll = function (params) {
        return this.suppliersService.getAll(params);
    };
    SuppliersController.prototype.getDetail = function (id) {
        return this.suppliersService.getById(id);
    };
    SuppliersController.prototype.update = function (id, data, user) {
        return this.suppliersService.update(id, data, user);
    };
    SuppliersController.prototype["delete"] = function (id, user) {
        return this.suppliersService["delete"](id, user);
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("create new supplier successfully"),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser())
    ], SuppliersController.prototype, "createVoucher");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("Get all supplier list"),
        __param(0, common_1.Query())
    ], SuppliersController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        customize_1.ResponseMessage(" get detail supplier by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], SuppliersController.prototype, "getDetail");
    __decorate([
        common_1.Patch(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("Update supplier by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()), __param(2, customize_1.CurrentUser())
    ], SuppliersController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
        customize_1.ResponseMessage("Delete voucher by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, customize_1.CurrentUser())
    ], SuppliersController.prototype, "delete");
    SuppliersController = __decorate([
        swagger_1.ApiTags("Suppliers"),
        common_1.Controller('suppliers')
    ], SuppliersController);
    return SuppliersController;
}());
exports.SuppliersController = SuppliersController;
