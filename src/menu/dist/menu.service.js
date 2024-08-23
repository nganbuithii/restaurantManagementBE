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
exports.MenuService = void 0;
var common_1 = require("@nestjs/common");
var MenuService = /** @class */ (function () {
    function MenuService(prismaService) {
        this.prismaService = prismaService;
    }
    MenuService.prototype.create = function (createMenuDto, user) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var newMenu;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.prismaService.menu.create({
                            data: {
                                name: createMenuDto.name,
                                isActive: (_a = createMenuDto.isActive) !== null && _a !== void 0 ? _a : true,
                                createdBy: user.sub
                            }
                        })];
                    case 1:
                        newMenu = _b.sent();
                        if (!(createMenuDto.menuItemIds && createMenuDto.menuItemIds.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.prismaService.menuItem.updateMany({
                                where: {
                                    id: { "in": createMenuDto.menuItemIds }
                                },
                                data: {
                                    menuId: newMenu.id
                                }
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, newMenu];
                }
            });
        });
    };
    MenuService.prototype.getAll = function (filters) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, page, _b, items_per_page, search, skip, take, _c, menus, total;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = filters.page, page = _a === void 0 ? 1 : _a, _b = filters.items_per_page, items_per_page = _b === void 0 ? 10 : _b, search = filters.search;
                        skip = (page - 1) * items_per_page;
                        take = items_per_page;
                        return [4 /*yield*/, Promise.all([
                                this.prismaService.menu.findMany({
                                    where: {
                                        name: {
                                            contains: search || ''
                                        }
                                    },
                                    skip: skip,
                                    take: take
                                }),
                                this.prismaService.menu.count({
                                    where: {
                                        name: {
                                            contains: search || ''
                                        }
                                    }
                                }),
                            ])];
                    case 1:
                        _c = _d.sent(), menus = _c[0], total = _c[1];
                        return [2 /*return*/, {
                                data: menus,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    MenuService.prototype.getDetail = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var menu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.menu.findUnique({
                            where: { id: id },
                            include: { menuItems: true }
                        })];
                    case 1:
                        menu = _a.sent();
                        if (!menu) {
                            throw new common_1.NotFoundException("Kh\u00F4ng t\u00ECm th\u1EA5y menu v\u1EDBi ID " + id);
                        }
                        return [2 /*return*/, menu];
                }
            });
        });
    };
    MenuService.prototype.update = function (id, data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var existingMenu, updateData, updatedMenu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.menu.findUnique({
                            where: { id: id },
                            include: { menuItems: true }
                        })];
                    case 1:
                        existingMenu = _a.sent();
                        if (!existingMenu) {
                            throw new common_1.NotFoundException("Menu with ID " + id + " not found");
                        }
                        updateData = {};
                        if (data.name !== undefined)
                            updateData.name = data.name;
                        updateData.updatedBy = user.sub; // Thêm thông tin về người cập nhật
                        return [4 /*yield*/, this.prismaService.menu.update({
                                where: { id: id },
                                data: updateData
                            })];
                    case 2:
                        updatedMenu = _a.sent();
                        if (!data.menuItems) return [3 /*break*/, 5];
                        // Xóa các món ăn hiện có liên kết với menu
                        return [4 /*yield*/, this.prismaService.menuItem.updateMany({
                                where: { menuId: id },
                                data: { menuId: null }
                            })];
                    case 3:
                        // Xóa các món ăn hiện có liên kết với menu
                        _a.sent();
                        // Cập nhật các món ăn mới liên kết với menu
                        return [4 /*yield*/, this.prismaService.menuItem.updateMany({
                                where: {
                                    id: { "in": data.menuItems }
                                },
                                data: { menuId: id }
                            })];
                    case 4:
                        // Cập nhật các món ăn mới liên kết với menu
                        _a.sent();
                        _a.label = 5;
                    case 5: 
                    // Truy vấn và trả về menu đã cập nhật cùng với các món ăn của nó
                    return [2 /*return*/, this.prismaService.menu.findUnique({
                            where: { id: id },
                            include: { menuItems: true }
                        })];
                }
            });
        });
    };
    MenuService.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, Promise, function () {
            var existingMenu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.menu.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        existingMenu = _a.sent();
                        if (!existingMenu) {
                            throw new common_1.NotFoundException("Menu with ID " + id + " not found");
                        }
                        // Cập nhật menu để xóa (chuyển isActive thành false và cập nhật deletedBy)
                        return [4 /*yield*/, this.prismaService.menu.update({
                                where: { id: id },
                                data: {
                                    isActive: false,
                                    deletedBy: user.sub
                                }
                            })];
                    case 2:
                        // Cập nhật menu để xóa (chuyển isActive thành false và cập nhật deletedBy)
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuService = __decorate([
        common_1.Injectable()
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
