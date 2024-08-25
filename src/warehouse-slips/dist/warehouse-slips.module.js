"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WarehouseSlipsModule = void 0;
var common_1 = require("@nestjs/common");
var warehouse_slips_service_1 = require("./warehouse-slips.service");
var warehouse_slips_controller_1 = require("./warehouse-slips.controller");
var config_1 = require("@nestjs/config");
var prisma_service_1 = require("src/prisma.service");
var jwt_1 = require("@nestjs/jwt");
var WarehouseSlipsModule = /** @class */ (function () {
    function WarehouseSlipsModule() {
    }
    WarehouseSlipsModule = __decorate([
        common_1.Module({
            imports: [jwt_1.JwtModule],
            controllers: [warehouse_slips_controller_1.WarehouseSlipsController],
            providers: [warehouse_slips_service_1.WarehouseSlipsService, prisma_service_1.PrismaService, config_1.ConfigService]
        })
    ], WarehouseSlipsModule);
    return WarehouseSlipsModule;
}());
exports.WarehouseSlipsModule = WarehouseSlipsModule;
