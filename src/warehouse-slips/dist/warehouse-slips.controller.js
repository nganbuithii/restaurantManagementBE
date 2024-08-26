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
exports.WarehouseSlipsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("decorators/customize");
var swagger_1 = require("@nestjs/swagger");
var WarehouseSlipsController = /** @class */ (function () {
    function WarehouseSlipsController(warehouseSlipsService) {
        this.warehouseSlipsService = warehouseSlipsService;
    }
    WarehouseSlipsController.prototype.createVoucher = function (body, user) {
        return this.warehouseSlipsService.create(body, user);
    };
    WarehouseSlipsController.prototype.getAll = function (params) {
        return this.warehouseSlipsService.getAll(params);
    };
    WarehouseSlipsController.prototype.getDetail = function (id) {
        return this.warehouseSlipsService.getById(id);
    };
    WarehouseSlipsController.prototype["delete"] = function (id, user) {
        return this.warehouseSlipsService["delete"](id, user);
    };
    WarehouseSlipsController.prototype.update = function (id, data, user) {
        return this.warehouseSlipsService.update(id, data, user);
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("create new warehouse slip successfully"),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser())
    ], WarehouseSlipsController.prototype, "createVoucher");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("Get all warehouse list"),
        __param(0, common_1.Query())
    ], WarehouseSlipsController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage(" get detail warehouse slip by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], WarehouseSlipsController.prototype, "getDetail");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
        customize_1.ResponseMessage("Delete warehouse slip by id is success"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, customize_1.CurrentUser())
    ], WarehouseSlipsController.prototype, "delete");
    __decorate([
        common_1.Patch(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("Update warehouse slip by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()), __param(2, customize_1.CurrentUser())
    ], WarehouseSlipsController.prototype, "update");
    WarehouseSlipsController = __decorate([
        swagger_1.ApiTags("WarehouseSlip"),
        common_1.Controller('warehouse-slips')
    ], WarehouseSlipsController);
    return WarehouseSlipsController;
}());
exports.WarehouseSlipsController = WarehouseSlipsController;
