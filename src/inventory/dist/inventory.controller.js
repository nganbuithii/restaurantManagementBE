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
exports.InventoryController = void 0;
var common_1 = require("@nestjs/common");
var customize_1 = require("decorators/customize");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var InventoryController = /** @class */ (function () {
    function InventoryController(inventoryService) {
        this.inventoryService = inventoryService;
    }
    InventoryController.prototype.getAll = function (params) {
        return this.inventoryService.getAll(params);
    };
    __decorate([
        common_1.Get(),
        customize_1.ResponseMessage("Get inventory list"),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Query())
    ], InventoryController.prototype, "getAll");
    InventoryController = __decorate([
        common_1.Controller('inventory')
    ], InventoryController);
    return InventoryController;
}());
exports.InventoryController = InventoryController;
