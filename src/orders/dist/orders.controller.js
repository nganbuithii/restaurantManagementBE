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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.OrdersController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var customize_1 = require("decorators/customize");
var swagger_1 = require("@nestjs/swagger");
var OrdersController = /** @class */ (function () {
    function OrdersController(ordersService, vouchersService) {
        this.ordersService = ordersService;
        this.vouchersService = vouchersService;
    }
    OrdersController.prototype.createOrder = function (body, user) {
        return this.ordersService.create(body, user);
    };
    OrdersController.prototype.getAll = function (params) {
        return this.ordersService.getAll(params);
    };
    OrdersController.prototype.getDetail = function (id) {
        return this.ordersService.getDetail(id);
    };
    OrdersController.prototype.updateOrder = function (id, updateOrderDto, user) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ordersService.update(id, updateOrderDto, user)];
            });
        });
    };
    OrdersController.prototype.applyVoucher = function (orderId, body) {
        return this.vouchersService.applyVoucher(orderId, body.voucherCode);
    };
    OrdersController.prototype.changeStatus = function (id, body, user) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ordersService.updateStatus(id, body.status, user)];
            });
        });
    };
    OrdersController.prototype.getStatistics = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ordersService.getStatistics()];
            });
        });
    };
    OrdersController.prototype.getRevenueStatistics = function (filterData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ordersService.getRevenueStatistics(filterData)];
            });
        });
    };
    OrdersController.prototype.getOrdersByUserIdAndDate = function (user, year, month) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ordersService.getOrdersByUserIdAndDate(user, year, month)];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, { orders: orders }];
                }
            });
        });
    };
    __decorate([
        common_1.Post(),
        common_1.HttpCode(common_1.HttpStatus.CREATED),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage('Order created successfully'),
        __param(0, common_1.Body()),
        __param(1, customize_1.CurrentUser())
    ], OrdersController.prototype, "createOrder");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("get all orders with pagination"),
        __param(0, common_1.Query())
    ], OrdersController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage(" get order by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], OrdersController.prototype, "getDetail");
    __decorate([
        common_1.Patch(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage('Order updated successfully'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body()),
        __param(2, customize_1.CurrentUser())
    ], OrdersController.prototype, "updateOrder");
    __decorate([
        common_1.Post('/:orderId/apply-voucher'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("Apply voucher to order"),
        __param(0, common_1.Param('orderId', common_1.ParseIntPipe)),
        __param(1, common_1.Body())
    ], OrdersController.prototype, "applyVoucher");
    __decorate([
        common_1.Patch(':id/change-status'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage('Order status updated successfully'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body()),
        __param(2, customize_1.CurrentUser())
    ], OrdersController.prototype, "changeStatus");
    __decorate([
        common_1.Post('statistics'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage('Order statistics retrieved successfully')
    ], OrdersController.prototype, "getStatistics");
    __decorate([
        common_1.Post('revenue-statistics'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        customize_1.ResponseMessage("Get revenue statistics"),
        swagger_1.ApiBody({
            schema: {
                type: 'object',
                properties: {
                    year: { type: 'number', nullable: true },
                    month: { type: 'number', nullable: true }
                }
            }
        }),
        __param(0, common_1.Body())
    ], OrdersController.prototype, "getRevenueStatistics");
    __decorate([
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Post('/me'),
        __param(0, customize_1.CurrentUser()),
        __param(1, common_1.Body('year')),
        __param(2, common_1.Body('month'))
    ], OrdersController.prototype, "getOrdersByUserIdAndDate");
    OrdersController = __decorate([
        swagger_1.ApiTags("Orders"),
        common_1.Controller('orders')
    ], OrdersController);
    return OrdersController;
}());
exports.OrdersController = OrdersController;
