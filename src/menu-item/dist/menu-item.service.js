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
exports.MenuItemService = void 0;
var common_1 = require("@nestjs/common");
var MenuItemService = /** @class */ (function () {
    function MenuItemService(prismaService, cloudinaryService) {
        this.prismaService = prismaService;
        this.cloudinaryService = cloudinaryService;
    }
    MenuItemService.prototype.create = function (body, user, files) {
        return __awaiter(this, void 0, void 0, function () {
            var name, price, ingredientIds, numericPrice, ingredientIdsAsNumbers, uploadedImages, menuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = body.name, price = body.price, ingredientIds = body.ingredientIds;
                        numericPrice = parseFloat(price.toString());
                        if (isNaN(numericPrice)) {
                            throw new common_1.BadRequestException('Price must be a number');
                        }
                        if (!files || files.length === 0) {
                            throw new common_1.BadRequestException('Ít nhất một hình ảnh là bắt buộc.');
                        }
                        ingredientIdsAsNumbers = Array.isArray(ingredientIds)
                            ? ingredientIds.map(function (id) { return Number(id); })
                            : [];
                        return [4 /*yield*/, this.cloudinaryService.uploadImages(files)];
                    case 1:
                        uploadedImages = _a.sent();
                        return [4 /*yield*/, this.prismaService.menuItem.create({
                                data: {
                                    name: name,
                                    price: numericPrice,
                                    createdBy: user.sub,
                                    images: {
                                        create: uploadedImages.map(function (image) { return ({
                                            url: image.secure_url
                                        }); })
                                    },
                                    ingredients: {
                                        create: ingredientIdsAsNumbers.map(function (id) { return ({
                                            ingredient: {
                                                connect: { id: id }
                                            }
                                        }); })
                                    }
                                }
                            })];
                    case 2:
                        menuItem = _a.sent();
                        return [2 /*return*/, menuItem];
                }
            });
        });
    };
    MenuItemService.prototype.getAll = function (filter) {
        return __awaiter(this, void 0, Promise, function () {
            var items_per_page, page, search, menuId, isBestSeller, skip, take, where, filteredWhere, _a, menuItems, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        items_per_page = Number(process.env.ITEMS_PER_PAGE);
                        page = Number(filter.page) || 1;
                        search = filter.search || "";
                        menuId = filter.menuId ? Number(filter.menuId) : undefined;
                        if (typeof filter.isBestSeller === 'string') {
                            // Chuyển đổi từ chuỗi thành boolean
                            isBestSeller = filter.isBestSeller === 'true' ? true :
                                filter.isBestSeller === 'false' ? false :
                                    undefined;
                        }
                        else if (typeof filter.isBestSeller === 'boolean') {
                            // Nếu isBestSeller đã là boolean, sử dụng trực tiếp
                            isBestSeller = filter.isBestSeller;
                        }
                        else {
                            isBestSeller = undefined;
                        }
                        skip = (page - 1) * items_per_page;
                        take = items_per_page;
                        where = {
                            name: search ? { contains: search } : undefined,
                            isBestSeller: isBestSeller,
                            menuId: menuId
                        };
                        filteredWhere = Object.fromEntries(Object.entries(where).filter(function (_a) {
                            var _ = _a[0], v = _a[1];
                            return v !== undefined;
                        }));
                        return [4 /*yield*/, this.prismaService.$transaction([
                                this.prismaService.menuItem.findMany({
                                    where: filteredWhere,
                                    skip: skip,
                                    take: take,
                                    include: {
                                        images: true,
                                        ingredients: true
                                    },
                                    orderBy: {
                                        id: 'desc'
                                    }
                                }),
                                this.prismaService.menuItem.count({ where: filteredWhere }),
                            ])];
                    case 1:
                        _a = _b.sent(), menuItems = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                data: menuItems,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    MenuItemService.prototype.getDetail = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var menuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.menuItem.findUnique({
                            where: { id: id },
                            include: {
                                images: true,
                                ingredients: {
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
                        menuItem = _a.sent();
                        if (!menuItem) {
                            throw new common_1.NotFoundException("Menu item with id " + id + " not found");
                        }
                        return [2 /*return*/, menuItem];
                }
            });
        });
    };
    MenuItemService.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, Promise, function () {
            var existingMenuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.menuItem.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        existingMenuItem = _a.sent();
                        if (!existingMenuItem) {
                            throw new common_1.NotFoundException("Kh\u00F4ng t\u00ECm th\u1EA5y m\u1EE5c menu v\u1EDBi ID " + id);
                        }
                        // Cập nhật mục menu: đặt isActive = false và cập nhật deletedBy
                        return [4 /*yield*/, this.prismaService.menuItem.update({
                                where: { id: id },
                                data: {
                                    isActive: false,
                                    deletedBy: user.sub
                                }
                            })];
                    case 2:
                        // Cập nhật mục menu: đặt isActive = false và cập nhật deletedBy
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuItemService = __decorate([
        common_1.Injectable()
    ], MenuItemService);
    return MenuItemService;
}());
exports.MenuItemService = MenuItemService;
