"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InventoryModule = void 0;
var common_1 = require("@nestjs/common");
var inventory_service_1 = require("./inventory.service");
var inventory_controller_1 = require("./inventory.controller");
var jwt_1 = require("@nestjs/jwt");
var prisma_service_1 = require("src/prisma.service");
var config_1 = require("@nestjs/config");
var email_service_1 = require("src/email/email.service");
var InventoryModule = /** @class */ (function () {
    function InventoryModule() {
    }
    InventoryModule = __decorate([
        common_1.Module({
            imports: [jwt_1.JwtModule],
            controllers: [inventory_controller_1.InventoryController],
            providers: [inventory_service_1.InventoryService, prisma_service_1.PrismaService, config_1.ConfigService, email_service_1.EmailService]
        })
    ], InventoryModule);
    return InventoryModule;
}());
exports.InventoryModule = InventoryModule;
