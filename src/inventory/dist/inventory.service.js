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
exports.InventoryService = void 0;
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var InventoryService = /** @class */ (function () {
    function InventoryService(prismaService, emailService) {
        this.prismaService = prismaService;
        this.emailService = emailService;
    }
    InventoryService.prototype.getAll = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, page, _b, items_per_page, search, skip, where, _c, inventoryItems, total;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = params.page, page = _a === void 0 ? parseInt(process.env.DEFAULT_PAGE, 10) || 1 : _a, _b = params.items_per_page, items_per_page = _b === void 0 ? parseInt(process.env.ITEMS_PER_PAGE, 10) || 10 : _b, search = params.search;
                        skip = (page - 1) * items_per_page;
                        where = search
                            ? {
                                OR: [
                                    { name: { contains: search, mode: 'insensitive' } },
                                    { description: { contains: search, mode: 'insensitive' } },
                                ]
                            }
                            : {};
                        return [4 /*yield*/, Promise.all([
                                this.prismaService.inventory.findMany({
                                    where: where,
                                    skip: skip,
                                    take: items_per_page,
                                    include: {
                                        ingredient: {
                                            select: { name: true }
                                        }
                                    }
                                }),
                                this.prismaService.inventory.count({ where: where }),
                            ])];
                    case 1:
                        _c = _d.sent(), inventoryItems = _c[0], total = _c[1];
                        return [2 /*return*/, {
                                data: inventoryItems.map(function (item) {
                                    var _a;
                                    return (__assign(__assign({}, item), { ingredientName: (_a = item.ingredient) === null || _a === void 0 ? void 0 : _a.name }));
                                }),
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    InventoryService.prototype.checkInventoryLevels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inventoryItems, lowStockItems, emailContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Checking inventory levels at 4:30 AM...');
                        return [4 /*yield*/, this.prismaService.inventory.findMany({
                                include: {
                                    ingredient: true
                                }
                            })];
                    case 1:
                        inventoryItems = _a.sent();
                        lowStockItems = inventoryItems.filter(function (item) {
                            var ingredient = item.ingredient;
                            // console.log("ingredient", ingredient)
                            return ingredient && ingredient.minThreshold !== null && item.quantity < ingredient.minThreshold;
                        });
                        if (!(lowStockItems.length > 0)) return [3 /*break*/, 3];
                        emailContent = lowStockItems.map(function (item) { return "\n                Ingredients:  " + item.ingredient.name + "\n                Current quantity:  " + item.quantity + "\n                 Minimum Threshold:  " + item.ingredient.minThreshold + "\n            "; }).join('\n\n');
                        return [4 /*yield*/, this.emailService.sendEmail('', 'Low Inventory Warning', "The following ingredients are below the minimum threshold:\n\n" + emailContent)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.emailService.sendEmail('', 'Notification of Adequate Stock of Raw Materials', 'Currently your inventory still has enough materials and no materials are below the minimum threshold.')];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        schedule_1.Cron(schedule_1.CronExpression.EVERY_5_HOURS)
    ], InventoryService.prototype, "checkInventoryLevels");
    InventoryService = __decorate([
        common_1.Injectable()
    ], InventoryService);
    return InventoryService;
}());
exports.InventoryService = InventoryService;
