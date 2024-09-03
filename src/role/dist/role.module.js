"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleModule = void 0;
var common_1 = require("@nestjs/common");
var role_controller_1 = require("./role.controller");
var role_service_1 = require("./role.service");
var prisma_service_1 = require("src/prisma.service");
var config_1 = require("@nestjs/config");
var jwt_1 = require("@nestjs/jwt");
var RoleModule = /** @class */ (function () {
    function RoleModule() {
    }
    RoleModule = __decorate([
        common_1.Module({
            imports: [jwt_1.JwtModule,],
            controllers: [role_controller_1.RoleController],
            providers: [role_service_1.RoleService, prisma_service_1.PrismaService, config_1.ConfigService]
        })
    ], RoleModule);
    return RoleModule;
}());
exports.RoleModule = RoleModule;
