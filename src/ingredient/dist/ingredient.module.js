"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IngredientModule = void 0;
var common_1 = require("@nestjs/common");
var ingredient_service_1 = require("./ingredient.service");
var ingredient_controller_1 = require("./ingredient.controller");
var prisma_service_1 = require("src/prisma.service");
var jwt_1 = require("@nestjs/jwt");
var config_1 = require("@nestjs/config");
var user_helper_1 = require("helper/user.helper");
var IngredientModule = /** @class */ (function () {
    function IngredientModule() {
    }
    IngredientModule = __decorate([
        common_1.Module({
            imports: [jwt_1.JwtModule],
            controllers: [ingredient_controller_1.IngredientController],
            providers: [ingredient_service_1.IngredientService, prisma_service_1.PrismaService, config_1.ConfigService, user_helper_1.UserHelper]
        })
    ], IngredientModule);
    return IngredientModule;
}());
exports.IngredientModule = IngredientModule;
