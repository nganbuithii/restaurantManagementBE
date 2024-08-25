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
exports.VouchersController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("decorators/customize");
var VouchersController = /** @class */ (function () {
    function VouchersController(vouchersService) {
        this.vouchersService = vouchersService;
    }
    VouchersController.prototype.createVoucher = function (body, user) {
        return this.vouchersService.create(body, user);
    };
    VouchersController.prototype.getAll = function (params) {
        return this.vouchersService.getAll(params);
    };
    VouchersController.prototype.getDetail = function (id) {
        return this.vouchersService.getById(id);
    };
    VouchersController.prototype.update = function (id, data, user) {
        return this.vouchersService.update(id, data, user);
    };
    VouchersController.prototype["delete"] = function (id, user) {
        return this.vouchersService["delete"](id, user);
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("create new voucher successfully"),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser())
    ], VouchersController.prototype, "createVoucher");
    __decorate([
        common_1.Get(),
        customize_1.ResponseMessage("Get vouchers list"),
        __param(0, common_1.Query())
    ], VouchersController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        customize_1.ResponseMessage(" get detail menu item by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], VouchersController.prototype, "getDetail");
    __decorate([
        common_1.Patch(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("Update voucher by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()), __param(2, customize_1.CurrentUser())
    ], VouchersController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
        customize_1.ResponseMessage("Delete voucher by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, customize_1.CurrentUser())
    ], VouchersController.prototype, "delete");
    VouchersController = __decorate([
        common_1.Controller('vouchers')
    ], VouchersController);
    return VouchersController;
}());
exports.VouchersController = VouchersController;
