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
exports.IngredientService = void 0;
var common_1 = require("@nestjs/common");
var status_constants_1 = require("constants/status.constants");
var IngredientService = /** @class */ (function () {
    function IngredientService(prismaService) {
        this.prismaService = prismaService;
    }
    IngredientService.prototype.create = function (body, user) {
        return __awaiter(this, void 0, void 0, function () {
            var name, unit, productDate, price, status, quantity, formattedProductDate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = body.name, unit = body.unit, productDate = body.productDate, price = body.price, status = body.status, quantity = body.quantity;
                        formattedProductDate = new Date(productDate).toISOString();
                        return [4 /*yield*/, this.prismaService.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                                var ingredient;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, prisma.ingredient.create({
                                                data: {
                                                    name: name,
                                                    unit: unit,
                                                    productDate: formattedProductDate,
                                                    price: price,
                                                    status: status,
                                                    createdBy: user.sub
                                                }
                                            })];
                                        case 1:
                                            ingredient = _a.sent();
                                            return [4 /*yield*/, prisma.inventory.create({
                                                    data: {
                                                        ingredientId: ingredient.id,
                                                        quantity: quantity,
                                                        lastChecked: new Date()
                                                    }
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/, ingredient];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IngredientService.prototype.validateStatus = function (status) {
        return status_constants_1.isValidStatus(status);
    };
    IngredientService.prototype.getAll = function (filters) {
        return __awaiter(this, void 0, Promise, function () {
            var items_per_page, page, search, sort, skip, orderBy, ingredients, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items_per_page = Number(filters.items_per_page) || 4;
                        page = Number(filters.page) || 1;
                        search = filters.search || "";
                        sort = filters.sort;
                        skip = page > 1 ? (page - 1) * items_per_page : 0;
                        orderBy = {
                            createdAt: "desc"
                        };
                        if (sort === 'price_asc') {
                            orderBy = {
                                price: 'asc'
                            };
                        }
                        else if (sort === 'price_desc') {
                            orderBy = {
                                price: 'desc'
                            };
                        }
                        return [4 /*yield*/, this.prismaService.ingredient.findMany({
                                take: items_per_page,
                                skip: skip,
                                where: {
                                    OR: [
                                        {
                                            name: {
                                                contains: search
                                            }
                                        },
                                        {
                                            unit: {
                                                contains: search
                                            }
                                        },
                                    ],
                                    isActive: filters.isActive === undefined ? undefined : filters.isActive === 'true'
                                },
                                orderBy: orderBy
                            })];
                    case 1:
                        ingredients = _a.sent();
                        return [4 /*yield*/, this.prismaService.ingredient.count({
                                where: {
                                    OR: [
                                        {
                                            name: {
                                                contains: search
                                            }
                                        },
                                        {
                                            unit: {
                                                contains: search
                                            }
                                        },
                                    ],
                                    isActive: filters.isActive === undefined ? undefined : filters.isActive === 'true'
                                }
                            })];
                    case 2:
                        total = _a.sent();
                        return [2 /*return*/, {
                                data: ingredients,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    IngredientService.prototype.getDetail = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ingredient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.ingredient.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        ingredient = _a.sent();
                        if (!ingredient) {
                            throw new common_1.NotFoundException("Ingredient with id " + id + " not found");
                        }
                        return [2 /*return*/, ingredient];
                }
            });
        });
    };
    IngredientService.prototype.update = function (id, data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var ingredient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.ingredient.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        ingredient = _a.sent();
                        if (!ingredient) {
                            throw new common_1.NotFoundException("Ingredient with id " + id + " not found");
                        }
                        return [2 /*return*/, this.prismaService.ingredient.update({
                                where: { id: id },
                                data: __assign(__assign({}, data), { updatedBy: user.sub, updatedAt: new Date() })
                            })];
                }
            });
        });
    };
    IngredientService.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, Promise, function () {
            var ingredient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.ingredient.update({
                            where: { id: id },
                            data: { isActive: false, deletedBy: user.sub }
                        })];
                    case 1:
                        ingredient = _a.sent();
                        return [2 /*return*/, ingredient];
                }
            });
        });
    };
    IngredientService = __decorate([
        common_1.Injectable()
    ], IngredientService);
    return IngredientService;
}());
exports.IngredientService = IngredientService;
