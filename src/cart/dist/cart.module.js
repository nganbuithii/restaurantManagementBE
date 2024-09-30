"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartModule = void 0;
var common_1 = require("@nestjs/common");
var cart_service_1 = require("./cart.service");
var cart_controller_1 = require("./cart.controller");
var prisma_service_1 = require("src/prisma.service");
var jwt_1 = require("@nestjs/jwt");
var config_1 = require("@nestjs/config");
var CartModule = /** @class */ (function () {
    function CartModule() {
    }
    CartModule = __decorate([
        common_1.Module({
            controllers: [cart_controller_1.CartController],
            providers: [cart_service_1.CartService, prisma_service_1.PrismaService, jwt_1.JwtService, config_1.ConfigService]
        })
    ], CartModule);
    return CartModule;
}());
exports.CartModule = CartModule;
