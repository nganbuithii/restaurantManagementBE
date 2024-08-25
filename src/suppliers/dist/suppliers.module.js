"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SuppliersModule = void 0;
var common_1 = require("@nestjs/common");
var suppliers_service_1 = require("./suppliers.service");
var suppliers_controller_1 = require("./suppliers.controller");
var jwt_1 = require("@nestjs/jwt");
var prisma_service_1 = require("src/prisma.service");
var config_1 = require("@nestjs/config");
var SuppliersModule = /** @class */ (function () {
    function SuppliersModule() {
    }
    SuppliersModule = __decorate([
        common_1.Module({
            imports: [jwt_1.JwtModule],
            controllers: [suppliers_controller_1.SuppliersController],
            providers: [suppliers_service_1.SuppliersService, prisma_service_1.PrismaService, config_1.ConfigService]
        })
    ], SuppliersModule);
    return SuppliersModule;
}());
exports.SuppliersModule = SuppliersModule;
