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
exports.MenuController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("decorators/customize");
var swagger_1 = require("@nestjs/swagger");
var MenuController = /** @class */ (function () {
    function MenuController(menuService) {
        this.menuService = menuService;
    }
    MenuController.prototype.createMenu = function (body, user) {
        return this.menuService.create(body, user);
    };
    MenuController.prototype.getAll = function (params) {
        return this.menuService.getAll(params);
    };
    MenuController.prototype.getDetail = function (id) {
        return this.menuService.getDetail(id);
    };
    MenuController.prototype.update = function (id, data, user) {
        return this.menuService.update(id, data, user);
    };
    MenuController.prototype.deleteMenuItem = function (id, user) {
        return this.menuService["delete"](id, user);
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("create new menu "),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser())
    ], MenuController.prototype, "createMenu");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("get all menu item with pagination"),
        __param(0, common_1.Query())
    ], MenuController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("get detail menu by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], MenuController.prototype, "getDetail");
    __decorate([
        common_1.Patch(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage(" update menu by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()), __param(2, customize_1.CurrentUser())
    ], MenuController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
        customize_1.ResponseMessage(" delete menu  by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, customize_1.CurrentUser())
    ], MenuController.prototype, "deleteMenuItem");
    MenuController = __decorate([
        swagger_1.ApiTags("Menu"),
        common_1.Controller('menu')
    ], MenuController);
    return MenuController;
}());
exports.MenuController = MenuController;
