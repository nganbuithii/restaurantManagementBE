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
exports.MenuItemController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("decorators/customize");
var MenuItemController = /** @class */ (function () {
    function MenuItemController(menuItemService) {
        this.menuItemService = menuItemService;
    }
    MenuItemController.prototype.createIngredient = function (body, user, files) {
        return this.menuItemService.create(body, user, files);
    };
    MenuItemController.prototype.getAll = function (params) {
        return this.menuItemService.getAll(params);
    };
    MenuItemController.prototype.getDetail = function (id) {
        return this.menuItemService.getDetail(id);
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("create new menu item"),
        common_1.UseInterceptors(platform_express_1.FilesInterceptor('files')),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser()),
        __param(2, common_1.UploadedFiles())
    ], MenuItemController.prototype, "createIngredient");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("get all menu item with pagination"),
        __param(0, common_1.Query())
    ], MenuItemController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage(" get detail menu item by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], MenuItemController.prototype, "getDetail");
    MenuItemController = __decorate([
        common_1.Controller('menu-item')
    ], MenuItemController);
    return MenuItemController;
}());
exports.MenuItemController = MenuItemController;
