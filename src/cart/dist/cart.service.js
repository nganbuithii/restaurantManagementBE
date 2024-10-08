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
exports.CartService = void 0;
// src/cart/cart.service.ts
var common_1 = require("@nestjs/common");
var CartService = /** @class */ (function () {
    function CartService(prisma) {
        this.prisma = prisma;
    }
    CartService.prototype.getCart = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var cart, newCart, totalItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.cart.findUnique({
                            where: { userId: user.sub },
                            include: {
                                items: {
                                    include: {
                                        menuItem: {
                                            include: {
                                                images: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        cart = _a.sent();
                        if (!!cart) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.prisma.cart.create({
                                data: {
                                    userId: user.sub,
                                    items: {
                                        create: []
                                    }
                                },
                                include: {
                                    items: {
                                        include: {
                                            menuItem: {
                                                include: {
                                                    images: true
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 2:
                        newCart = _a.sent();
                        return [2 /*return*/, { cart: newCart, totalItems: 0 }];
                    case 3:
                        totalItems = cart.items.reduce(function (acc, item) { return acc + item.quantity; }, 0);
                        return [2 /*return*/, { cart: cart, totalItems: totalItems }];
                }
            });
        });
    };
    CartService.prototype.addToCart = function (user, addToCartDto) {
        return __awaiter(this, void 0, Promise, function () {
            var menuItemId, quantity, menuItem, cart, existingCartItem, updatedCart, totalItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        menuItemId = addToCartDto.menuItemId, quantity = addToCartDto.quantity;
                        return [4 /*yield*/, this.prisma.menuItem.findUnique({
                                where: { id: menuItemId }
                            })];
                    case 1:
                        menuItem = _a.sent();
                        if (!menuItem) {
                            throw new common_1.NotFoundException('Menu item not found');
                        }
                        return [4 /*yield*/, this.prisma.cart.findUnique({
                                where: { userId: user.sub }
                            })];
                    case 2:
                        cart = _a.sent();
                        if (!!cart) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.prisma.cart.create({
                                data: {
                                    userId: user.sub
                                }
                            })];
                    case 3:
                        // Create cart if it doesn't exist
                        cart = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.prisma.cartItem.findUnique({
                            where: {
                                cartId_menuItemId: {
                                    cartId: cart.id,
                                    menuItemId: menuItemId
                                }
                            }
                        })];
                    case 5:
                        existingCartItem = _a.sent();
                        if (!existingCartItem) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.prisma.cartItem.update({
                                where: {
                                    cartId_menuItemId: {
                                        cartId: cart.id,
                                        menuItemId: menuItemId
                                    }
                                },
                                data: {
                                    quantity: existingCartItem.quantity + quantity
                                }
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.prisma.cartItem.create({
                            data: {
                                cartId: cart.id,
                                menuItemId: menuItemId,
                                quantity: quantity
                            }
                        })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4 /*yield*/, this.prisma.cart.findUnique({
                            where: { id: cart.id },
                            include: {
                                items: {
                                    include: {
                                        menuItem: true
                                    }
                                }
                            }
                        })];
                    case 10:
                        updatedCart = _a.sent();
                        totalItems = updatedCart.items.reduce(function (acc, item) { return acc + item.quantity; }, 0);
                        return [2 /*return*/, { cart: updatedCart, totalItems: totalItems, message: 'Item added to cart successfully' }];
                }
            });
        });
    };
    CartService.prototype.removeFromCart = function (user, menuItemId) {
        return __awaiter(this, void 0, Promise, function () {
            var cart, menuItemIdInt, cartItem, updatedCart, totalItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.cart.findUnique({
                            where: { userId: user.sub },
                            include: {
                                items: true
                            }
                        })];
                    case 1:
                        cart = _a.sent();
                        console.log("Cart", cart);
                        if (!cart) {
                            throw new common_1.NotFoundException('Cart not found');
                        }
                        menuItemIdInt = parseInt(menuItemId, 10);
                        console.log("MenuOtem Int", menuItemIdInt);
                        cartItem = cart.items.find(function (item) { return item.menuItemId === menuItemIdInt; });
                        if (!cartItem) {
                            throw new common_1.NotFoundException('Cart item not found or does not belong to the current cart');
                        }
                        return [4 /*yield*/, this.prisma.cartItem["delete"]({
                                where: { id: cartItem.id }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.prisma.cart.findUnique({
                                where: { id: cart.id },
                                include: {
                                    items: {
                                        include: {
                                            menuItem: true
                                        }
                                    }
                                }
                            })];
                    case 3:
                        updatedCart = _a.sent();
                        totalItems = updatedCart.items.reduce(function (acc, item) { return acc + item.quantity; }, 0);
                        return [2 /*return*/, { cart: updatedCart, totalItems: totalItems, message: 'Item removed from cart successfully' }];
                }
            });
        });
    };
    CartService.prototype.updateCart = function (user, updateCartDto) {
        return __awaiter(this, void 0, Promise, function () {
            var itemId, quantity, cart, cartItem, updatedCart, totalItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemId = updateCartDto.itemId, quantity = updateCartDto.quantity;
                        return [4 /*yield*/, this.prisma.cart.findUnique({
                                where: { userId: user.sub },
                                include: { items: true }
                            })];
                    case 1:
                        cart = _a.sent();
                        console.log("Item Id", itemId);
                        console.log("cart", cart);
                        if (!cart) {
                            throw new common_1.NotFoundException('Cart not found');
                        }
                        cartItem = cart.items.find(function (item) { return item.menuItemId === itemId; });
                        if (!cartItem) {
                            throw new common_1.NotFoundException('Cart item not found or does not belong to the current cart');
                        }
                        return [4 /*yield*/, this.prisma.cartItem.update({
                                where: { id: cartItem.id },
                                data: { quantity: quantity }
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.prisma.cart.findUnique({
                                where: { id: cart.id },
                                include: {
                                    items: {
                                        include: {
                                            menuItem: true
                                        }
                                    }
                                }
                            })];
                    case 3:
                        updatedCart = _a.sent();
                        totalItems = updatedCart.items.reduce(function (acc, item) { return acc + item.quantity; }, 0);
                        return [2 /*return*/, { cart: updatedCart, totalItems: totalItems, message: 'Cart updated successfully' }];
                }
            });
        });
    };
    CartService = __decorate([
        common_1.Injectable()
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
