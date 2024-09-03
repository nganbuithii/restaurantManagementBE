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
exports.TableController = void 0;
var common_1 = require("@nestjs/common");
var customize_1 = require("decorators/customize");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var swagger_1 = require("@nestjs/swagger");
var TableController = /** @class */ (function () {
    function TableController(tableService) {
        this.tableService = tableService;
    }
    TableController.prototype.createTable = function (body, user) {
        return this.tableService.create(body, user);
    };
    TableController.prototype.getAll = function (params) {
        return this.tableService.getAll(params);
    };
    TableController.prototype.deleteTable = function (id, user) {
        return this.tableService["delete"](id, user);
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED)
        // @UseGuards(JwtAuthGuard)
        ,
        customize_1.ResponseMessage("create new table"),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser())
    ], TableController.prototype, "createTable");
    __decorate([
        common_1.Get()
        // @UseGuards(JwtAuthGuard)
        ,
        customize_1.ResponseMessage("get all table with pagination"),
        __param(0, common_1.Query())
    ], TableController.prototype, "getAll");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
        customize_1.ResponseMessage(" delete table by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, customize_1.CurrentUser())
    ], TableController.prototype, "deleteTable");
    TableController = __decorate([
        swagger_1.ApiTags("Table"),
        common_1.Controller('table')
    ], TableController);
    return TableController;
}());
exports.TableController = TableController;
