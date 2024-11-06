"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.OrdersService = void 0;
var common_1 = require("@nestjs/common");
var OrdersService = /** @class */ (function () {
    function OrdersService(prisma) {
        this.prisma = prisma;
    }
    OrdersService.prototype.create = function (createOrderDto, user) {
        return __awaiter(this, void 0, Promise, function () {
            var status, discountPrice, details, totalPrice, _i, details_1, detail, menuItem, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = createOrderDto.status, discountPrice = createOrderDto.discountPrice, details = createOrderDto.details;
                        totalPrice = 0;
                        _i = 0, details_1 = details;
                        _a.label = 1;
                    case 1:
                        if (!(_i < details_1.length)) return [3 /*break*/, 4];
                        detail = details_1[_i];
                        return [4 /*yield*/, this.prisma.menuItem.findUnique({
                                where: { id: detail.menuItemId }
                            })];
                    case 2:
                        menuItem = _a.sent();
                        if (!menuItem) {
                            throw new common_1.NotFoundException("MenuItem with id " + detail.menuItemId + " not found");
                        }
                        // Cộng thêm vào totalPrice
                        totalPrice += menuItem.price * detail.quantity;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.prisma.order.create({
                            data: {
                                status: status,
                                totalPrice: totalPrice,
                                discountPrice: discountPrice,
                                userId: user.sub,
                                details: {
                                    create: details.map(function (detail) { return ({
                                        quantity: detail.quantity,
                                        menuItem: { connect: { id: detail.menuItemId } }
                                    }); })
                                }
                            },
                            include: {
                                details: true
                            }
                        })];
                    case 5:
                        order = _a.sent();
                        return [2 /*return*/, order];
                }
            });
        });
    };
    OrdersService.prototype.getAll = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, page, _b, items_per_page, search, skip, where, _c, orders, total, customOrders;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = params.page, page = _a === void 0 ? 1 : _a, _b = params.items_per_page, items_per_page = _b === void 0 ? parseInt(process.env.ITEMS_PER_PAGE, 10) || 10 : _b, search = params.search;
                        skip = (page - 1) * items_per_page;
                        where = search
                            ? {
                                status: { contains: search }
                            }
                            : {};
                        return [4 /*yield*/, Promise.all([
                                this.prisma.order.findMany({
                                    where: where,
                                    skip: skip,
                                    take: items_per_page,
                                    include: {
                                        details: true
                                    }
                                }),
                                this.prisma.order.count({ where: where }),
                            ])];
                    case 1:
                        _c = _d.sent(), orders = _c[0], total = _c[1];
                        customOrders = orders.map(function (order) { return ({
                            id: order.id,
                            status: order.status,
                            totalPrice: order.totalPrice,
                            discountPrice: order.discountPrice,
                            userId: order.userId,
                            createdAt: order.createdAt,
                            updatedAt: order.updatedAt,
                            usedVoucherId: order.usedVoucherId,
                            details: order.details.map(function (detail) { return ({
                                id: detail.id,
                                quantity: detail.quantity,
                                menuItemId: detail.menuItemId
                            }); })
                        }); });
                        return [2 /*return*/, {
                                data: customOrders,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    OrdersService.prototype.getDetail = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.order.findUnique({
                            where: { id: id },
                            include: {
                                details: {
                                    include: {
                                        menuItem: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new common_1.NotFoundException("Order with id " + id + " not found");
                        }
                        return [2 /*return*/, {
                                id: order.id,
                                status: order.status,
                                totalPrice: order.totalPrice,
                                discountPrice: order.discountPrice,
                                userId: order.userId,
                                createdAt: order.createdAt,
                                details: order.details.map(function (detail) { return ({
                                    id: detail.id,
                                    quantity: detail.quantity,
                                    menuItemId: detail.menuItemId,
                                    menuItemName: detail.menuItem ? detail.menuItem.name : 'Unknown'
                                }); })
                            }];
                }
            });
        });
    };
    OrdersService.prototype.update = function (id, updateOrderDto, user) {
        return __awaiter(this, void 0, Promise, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.order.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new common_1.NotFoundException("Order with id " + id + " not found");
                        }
                        if (order.userId !== user.sub) {
                            throw new common_1.ForbiddenException('You are not allowed to update this order');
                        }
                        return [2 /*return*/, this.prisma.order.update({
                                where: { id: id },
                                data: __assign({}, updateOrderDto)
                            })];
                }
            });
        });
    };
    OrdersService.prototype.updateStatus = function (orderId, status, user) {
        return __awaiter(this, void 0, Promise, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.order.findUnique({ where: { id: orderId } })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new common_1.NotFoundException('Order not found');
                        }
                        return [2 /*return*/, this.prisma.order.update({
                                where: { id: orderId },
                                data: { status: status }
                            })];
                }
            });
        });
    };
    OrdersService.prototype.getStatistics = function () {
        return __awaiter(this, void 0, Promise, function () {
            var totalOrders, totalRevenue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.order.count()];
                    case 1:
                        totalOrders = _a.sent();
                        return [4 /*yield*/, this.prisma.order.aggregate({
                                _sum: {
                                    totalPrice: true
                                }
                            })];
                    case 2:
                        totalRevenue = _a.sent();
                        return [2 /*return*/, {
                                totalOrders: totalOrders,
                                totalRevenue: totalRevenue._sum.totalPrice || 0
                            }];
                }
            });
        });
    };
    OrdersService.prototype.getRevenueStatistics = function (filterData) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, startDate, endDate, orders, revenueByMonth, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentDate = new Date();
                        if (filterData.year && filterData.month) {
                            startDate = new Date(filterData.year, filterData.month - 1, 1);
                            endDate = new Date(filterData.year, filterData.month, 0);
                        }
                        else if (filterData.year) {
                            startDate = new Date(filterData.year, 0, 1);
                            endDate = new Date(filterData.year, 11, 31);
                        }
                        else {
                            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1);
                            endDate = currentDate;
                        }
                        return [4 /*yield*/, this.prisma.order.findMany({
                                where: {
                                    createdAt: {
                                        gte: startDate,
                                        lte: endDate
                                    },
                                    status: 'COMPLETED'
                                },
                                select: {
                                    createdAt: true,
                                    totalPrice: true,
                                    discountPrice: true
                                }
                            })];
                    case 1:
                        orders = _a.sent();
                        revenueByMonth = new Map();
                        orders.forEach(function (order) {
                            var monthYear = order.createdAt.getFullYear() + "-" + (order.createdAt.getMonth() + 1);
                            var currentRevenue = revenueByMonth.get(monthYear) || { total: 0, discount: 0 };
                            revenueByMonth.set(monthYear, {
                                total: currentRevenue.total + order.totalPrice,
                                discount: currentRevenue.discount + order.discountPrice
                            });
                        });
                        result = Array.from(revenueByMonth, function (_a) {
                            var monthYear = _a[0], revenue = _a[1];
                            return ({
                                monthYear: monthYear,
                                totalRevenue: revenue.total,
                                discountAmount: revenue.discount,
                                netRevenue: revenue.total - revenue.discount
                            });
                        });
                        // Sắp xếp kết quả theo thời gian giảm dần
                        result.sort(function (a, b) {
                            var _a = a.monthYear.split('-').map(Number), yearA = _a[0], monthA = _a[1];
                            var _b = b.monthYear.split('-').map(Number), yearB = _b[0], monthB = _b[1];
                            return yearB - yearA || monthB - monthA;
                        });
                        return [2 /*return*/, {
                                startDate: startDate,
                                endDate: endDate,
                                data: result
                            }];
                }
            });
        });
    };
    OrdersService.prototype.getOrdersByUserIdAndDate = function (user, year, month) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prisma.order.findMany({
                        where: {
                            userId: user.sub,
                            createdAt: {
                                gte: new Date(year, month - 1, 1),
                                lt: new Date(year, month, 1)
                            }
                        },
                        include: {
                            details: true,
                            usedVoucher: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    })];
            });
        });
    };
    OrdersService = __decorate([
        common_1.Injectable()
    ], OrdersService);
    return OrdersService;
}());
exports.OrdersService = OrdersService;
