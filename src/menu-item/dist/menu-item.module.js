"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuItemModule = void 0;
var common_1 = require("@nestjs/common");
var menu_item_service_1 = require("./menu-item.service");
var menu_item_controller_1 = require("./menu-item.controller");
var prisma_service_1 = require("src/prisma.service");
var config_1 = require("@nestjs/config");
var jwt_1 = require("@nestjs/jwt");
var cloudinary_module_1 = require("src/cloudinary/cloudinary.module");
var MenuItemModule = /** @class */ (function () {
    function MenuItemModule() {
    }
    MenuItemModule = __decorate([
        common_1.Module({
            imports: [jwt_1.JwtModule, cloudinary_module_1.CloudinaryModule],
            controllers: [menu_item_controller_1.MenuItemController],
            providers: [menu_item_service_1.MenuItemService, prisma_service_1.PrismaService, config_1.ConfigService]
        })
    ], MenuItemModule);
    return MenuItemModule;
}());
exports.MenuItemModule = MenuItemModule;