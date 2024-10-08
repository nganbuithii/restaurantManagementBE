"use strict";
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
exports.WarehouseSlipsService = void 0;
var common_1 = require("@nestjs/common");
var WarehouseSlipsService = /** @class */ (function () {
    function WarehouseSlipsService(prisma) {
        this.prisma = prisma;
    }
    WarehouseSlipsService.prototype.create = function (body, user) {
        return __awaiter(this, void 0, Promise, function () {
            var supplier, ingredientIds, ingredients, _loop_1, _i, _a, detail, warehouseSlip;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.prisma.supplier.findUnique({ where: { id: body.supplierId } }),
                        ])];
                    case 1:
                        supplier = _b.sent();
                        if (!supplier)
                            throw new common_1.BadRequestException('Supplier not found');
                        ingredientIds = body.details.map(function (detail) { return detail.ingredientId; });
                        return [4 /*yield*/, this.prisma.ingredient.findMany({
                                where: { id: { "in": ingredientIds } },
                                include: { inventory: true }
                            })];
                    case 2:
                        ingredients = _b.sent();
                        if (ingredients.length !== ingredientIds.length) {
                            throw new common_1.BadRequestException('One or more ingredients not found');
                        }
                        // Kiểm tra số lượng tồn kho cho phiếu xuất
                        if (body.type === 'OUT') {
                            _loop_1 = function (detail) {
                                var ingredient = ingredients.find(function (i) { return i.id === detail.ingredientId; });
                                if (!ingredient.inventory || detail.quantity > ingredient.inventory.quantity) {
                                    throw new common_1.BadRequestException("Insufficient inventory for Ingredient ID " + detail.ingredientId);
                                }
                            };
                            for (_i = 0, _a = body.details; _i < _a.length; _i++) {
                                detail = _a[_i];
                                _loop_1(detail);
                            }
                        }
                        return [4 /*yield*/, this.prisma.warehouseSlip.create({
                                data: {
                                    type: body.type,
                                    userId: user.sub,
                                    supplierId: body.supplierId,
                                    details: {
                                        create: body.details.map(function (detail) { return ({
                                            quantity: detail.quantity,
                                            ingredientId: detail.ingredientId
                                        }); })
                                    }
                                },
                                include: { details: true }
                            })];
                    case 3:
                        warehouseSlip = _b.sent();
                        if (!(body.type === 'OUT')) return [3 /*break*/, 5];
                        return [4 /*yield*/, Promise.all(body.details.map(function (detail) {
                                return _this.prisma.inventory.update({
                                    where: { ingredientId: detail.ingredientId },
                                    data: { quantity: { decrement: detail.quantity } }
                                });
                            }))];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(body.type === 'IN')) return [3 /*break*/, 7];
                        return [4 /*yield*/, Promise.all(body.details.map(function (detail) {
                                return _this.prisma.inventory.upsert({
                                    where: { ingredientId: detail.ingredientId },
                                    update: { quantity: { increment: detail.quantity } },
                                    create: { ingredientId: detail.ingredientId, quantity: detail.quantity, lastChecked: new Date() }
                                });
                            }))];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/, warehouseSlip];
                }
            });
        });
    };
    WarehouseSlipsService.prototype.getAll = function (filter) {
        return __awaiter(this, void 0, Promise, function () {
            var itemsPerPage, currentPage, search, page, perPage, warehouseSlips, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemsPerPage = parseInt(process.env.ITEMS_PER_PAGE, 10) || 10;
                        currentPage = parseInt(process.env.DEFAULT_PAGE, 10) || 1;
                        search = filter.search || '';
                        page = filter.page || currentPage;
                        perPage = filter.items_per_page || itemsPerPage;
                        return [4 /*yield*/, this.prisma.warehouseSlip.findMany({
                                where: {
                                    type: {
                                        contains: search
                                    }
                                },
                                skip: (page - 1) * perPage,
                                take: perPage,
                                include: {
                                    details: true
                                }
                            })];
                    case 1:
                        warehouseSlips = _a.sent();
                        return [4 /*yield*/, this.prisma.warehouseSlip.count({
                                where: {
                                    type: {
                                        contains: search
                                    }
                                }
                            })];
                    case 2:
                        total = _a.sent();
                        return [2 /*return*/, {
                                data: warehouseSlips,
                                total: total,
                                currentPage: page,
                                itemsPerPage: perPage
                            }];
                }
            });
        });
    };
    WarehouseSlipsService.prototype.getById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var warehouseSlip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.warehouseSlip.findUnique({
                            where: { id: id },
                            include: {
                                user: {
                                    select: {
                                        fullName: true,
                                        email: true
                                    }
                                },
                                supplier: {
                                    select: {
                                        name: true
                                    }
                                },
                                details: {
                                    include: {
                                        ingredient: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        warehouseSlip = _a.sent();
                        if (!warehouseSlip) {
                            throw new common_1.NotFoundException("WarehouseSlip v\u1EDBi ID " + id + " kh\u00F4ng \u0111\u01B0\u1EE3c t\u00ECm th\u1EA5y");
                        }
                        return [2 /*return*/, warehouseSlip];
                }
            });
        });
    };
    WarehouseSlipsService.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, Promise, function () {
            var warehouseSlip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.warehouseSlip.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        warehouseSlip = _a.sent();
                        if (!warehouseSlip) {
                            throw new common_1.NotFoundException("WarehouseSlip with ID " + id + " not found");
                        }
                        return [4 /*yield*/, this.prisma.warehouseSlip.update({
                                where: { id: id },
                                data: {
                                    isActive: false,
                                    updatedAt: new Date()
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WarehouseSlipsService.prototype.update = function (id, data, user) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var existingWarehouseSlip, updatedWarehouseSlip;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.prisma.warehouseSlip.findUnique({
                            where: { id: id },
                            include: { details: true }
                        })];
                    case 1:
                        existingWarehouseSlip = _b.sent();
                        if (!existingWarehouseSlip) {
                            throw new common_1.BadRequestException('Warehouse slip not found');
                        }
                        return [4 /*yield*/, this.prisma.warehouseSlip.update({
                                where: { id: id },
                                data: {
                                    supplierId: (_a = data.supplierId) !== null && _a !== void 0 ? _a : existingWarehouseSlip.supplierId,
                                    updatedAt: new Date(),
                                    details: data.details
                                        ? {
                                            deleteMany: {},
                                            create: data.details.map(function (detail) { return ({
                                                ingredientId: detail.ingredientId,
                                                quantity: detail.quantity
                                            }); })
                                        }
                                        : undefined
                                },
                                include: { details: true }
                            })];
                    case 2:
                        updatedWarehouseSlip = _b.sent();
                        return [2 /*return*/, updatedWarehouseSlip];
                }
            });
        });
    };
    WarehouseSlipsService.prototype.getStatistics = function () {
        return __awaiter(this, void 0, Promise, function () {
            var totalIn, totalOut, totalActive, totalInactive, totalDetails, totalIngredients, ingredientsInInventory, ingredientsWithoutInventory, totalInventoryQuantity, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this.prisma.warehouseSlip.count({
                                where: { type: 'IN' }
                            })];
                    case 1:
                        totalIn = _a.sent();
                        return [4 /*yield*/, this.prisma.warehouseSlip.count({
                                where: { type: 'OUT' }
                            })];
                    case 2:
                        totalOut = _a.sent();
                        return [4 /*yield*/, this.prisma.warehouseSlip.count({
                                where: { isActive: true }
                            })];
                    case 3:
                        totalActive = _a.sent();
                        return [4 /*yield*/, this.prisma.warehouseSlip.count({
                                where: { isActive: false }
                            })];
                    case 4:
                        totalInactive = _a.sent();
                        return [4 /*yield*/, this.prisma.warehouseSlipDetail.count()];
                    case 5:
                        totalDetails = _a.sent();
                        return [4 /*yield*/, this.prisma.ingredient.count()];
                    case 6:
                        totalIngredients = _a.sent();
                        return [4 /*yield*/, this.prisma.inventory.count()];
                    case 7:
                        ingredientsInInventory = _a.sent();
                        ingredientsWithoutInventory = totalIngredients - ingredientsInInventory;
                        return [4 /*yield*/, this.prisma.inventory.aggregate({
                                _sum: {
                                    quantity: true
                                }
                            })];
                    case 8:
                        totalInventoryQuantity = _a.sent();
                        return [2 /*return*/, {
                                warehouseStatistics: {
                                    totalIn: totalIn,
                                    totalOut: totalOut,
                                    totalActive: totalActive,
                                    totalInactive: totalInactive,
                                    totalDetails: totalDetails
                                },
                                ingredientStatistics: {
                                    totalIngredients: totalIngredients,
                                    ingredientsInInventory: ingredientsInInventory,
                                    ingredientsWithoutInventory: ingredientsWithoutInventory,
                                    totalInventoryQuantity: totalInventoryQuantity._sum.quantity || 0
                                }
                            }];
                    case 9:
                        error_1 = _a.sent();
                        console.error('Error fetching statistics:', error_1);
                        throw error_1;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    WarehouseSlipsService = __decorate([
        common_1.Injectable()
    ], WarehouseSlipsService);
    return WarehouseSlipsService;
}());
exports.WarehouseSlipsService = WarehouseSlipsService;
