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
            var name, price, ingredientQuantities, numericPrice, parsedIngredientQuantities, uploadedImages, menuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = body.name, price = body.price, ingredientQuantities = body.ingredientQuantities;
                        numericPrice = typeof price === 'string' ? parseFloat(price) : price;
                        // Kiểm tra nếu không có hình ảnh
                        if (!files || files.length === 0) {
                            throw new common_1.BadRequestException('At least one image is required.');
                        }
                        try {
                            parsedIngredientQuantities = typeof ingredientQuantities === 'string'
                                ? JSON.parse(ingredientQuantities)
                                : ingredientQuantities;
                        }
                        catch (e) {
                            throw new common_1.BadRequestException('Invalid format for ingredientQuantities.');
                        }
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
                                        create: parsedIngredientQuantities.map(function (item) { return ({
                                            ingredient: {
                                                connect: { id: item.ingredientId }
                                            },
                                            quantity: item.quantity
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
            var _a, page, _b, items_per_page, search, skip, take, where, _c, menuItems, total;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = filter.page, page = _a === void 0 ? 1 : _a, _b = filter.items_per_page, items_per_page = _b === void 0 ? 10 : _b, search = filter.search;
                        skip = (page - 1) * items_per_page;
                        take = items_per_page;
                        where = search ? { name: { contains: search } } : {};
                        return [4 /*yield*/, this.prismaService.$transaction([
                                this.prismaService.menuItem.findMany({
                                    where: where,
                                    skip: skip,
                                    take: take,
                                    include: {
                                        images: true,
                                        ingredients: true
                                    }
                                }),
                                this.prismaService.menuItem.count({ where: where }),
                            ])];
                    case 1:
                        _c = _d.sent(), menuItems = _c[0], total = _c[1];
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
                                ingredients: true
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
    MenuItemService.prototype.update = function (id, data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var existingMenuItem, updateData, updatedMenuItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.menuItem.findUnique({
                            where: { id: id },
                            include: { ingredients: true }
                        })];
                    case 1:
                        existingMenuItem = _a.sent();
                        if (!existingMenuItem) {
                            throw new common_1.NotFoundException("Kh\u00F4ng t\u00ECm th\u1EA5y m\u1EE5c menu v\u1EDBi ID " + id);
                        }
                        updateData = {
                            updatedBy: user.sub,
                            updatedAt: new Date()
                        };
                        if (data.name !== undefined)
                            updateData.name = data.name;
                        if (data.price !== undefined)
                            updateData.price = data.price;
                        return [4 /*yield*/, this.prismaService.menuItem.update({
                                where: { id: id },
                                data: updateData
                            })];
                    case 2:
                        updatedMenuItem = _a.sent();
                        if (!(data.ingredientQuantities && data.ingredientQuantities.length > 0)) return [3 /*break*/, 5];
                        // Xóa các mối quan hệ hiện có
                        return [4 /*yield*/, this.prismaService.menuItemIngredient.deleteMany({
                                where: { menuItemId: id }
                            })];
                    case 3:
                        // Xóa các mối quan hệ hiện có
                        _a.sent();
                        // Tạo các mối quan hệ mới
                        return [4 /*yield*/, this.prismaService.menuItemIngredient.createMany({
                                data: data.ingredientQuantities.map(function (iq) { return ({
                                    menuItemId: id,
                                    ingredientId: iq.ingredientId,
                                    quantity: iq.quantity
                                }); })
                            })];
                    case 4:
                        // Tạo các mối quan hệ mới
                        _a.sent();
                        _a.label = 5;
                    case 5: 
                    // Truy vấn và trả về mục menu đã được cập nhật cùng với các nguyên liệu của nó
                    return [2 /*return*/, this.prismaService.menuItem.findUnique({
                            where: { id: id },
                            include: { ingredients: true }
                        })];
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
