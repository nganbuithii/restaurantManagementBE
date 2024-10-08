"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VouchersModule = void 0;
var common_1 = require("@nestjs/common");
var vouchers_service_1 = require("./vouchers.service");
var vouchers_controller_1 = require("./vouchers.controller");
var prisma_service_1 = require("src/prisma.service");
var config_1 = require("@nestjs/config");
var jwt_1 = require("@nestjs/jwt");
var notification_service_1 = require("src/notification/notification.service");
var VouchersModule = /** @class */ (function () {
    function VouchersModule() {
    }
    VouchersModule = __decorate([
        common_1.Module({
            imports: [jwt_1.JwtModule,],
            controllers: [vouchers_controller_1.VouchersController],
            exports: [vouchers_service_1.VouchersService],
            providers: [vouchers_service_1.VouchersService, prisma_service_1.PrismaService, config_1.ConfigService, notification_service_1.NotificationService]
        })
    ], VouchersModule);
    return VouchersModule;
}());
exports.VouchersModule = VouchersModule;
