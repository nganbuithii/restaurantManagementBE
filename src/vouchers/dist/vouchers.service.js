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
exports.VouchersService = void 0;
var common_1 = require("@nestjs/common");
var voucher_helper_1 = require("helper/voucher.helper");
var VouchersService = /** @class */ (function () {
    function VouchersService(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    VouchersService.prototype.create = function (createVoucherDto, user) {
        return __awaiter(this, void 0, Promise, function () {
            var percent, description, startDate, endDate, isActive, status, quantity, pointCost, code, voucher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        percent = createVoucherDto.percent, description = createVoucherDto.description, startDate = createVoucherDto.startDate, endDate = createVoucherDto.endDate, isActive = createVoucherDto.isActive, status = createVoucherDto.status, quantity = createVoucherDto.quantity, pointCost = createVoucherDto.pointCost;
                        code = voucher_helper_1.generateVoucherCode();
                        // Kiểm tra tính hợp lệ của ngày kết thúc
                        if (new Date(startDate) > new Date(endDate)) {
                            throw new common_1.BadRequestException('End date must be after start date');
                        }
                        return [4 /*yield*/, this.prisma.voucher.create({
                                data: {
                                    code: code,
                                    percent: percent,
                                    description: description,
                                    startDate: startDate,
                                    endDate: endDate,
                                    isActive: isActive,
                                    status: status,
                                    quantity: quantity,
                                    pointCost: pointCost,
                                    createdBy: user.sub
                                }
                            })];
                    case 1:
                        voucher = _a.sent();
                        return [4 /*yield*/, this.notificationService.sendAndSaveNotification('New Voucher Available', "A new voucher \"" + voucher.code + "\" has been created!", 'new_vouchers')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, voucher];
                }
            });
        });
    };
    VouchersService.prototype.getAll = function (filter) {
        return __awaiter(this, void 0, Promise, function () {
            var items_per_page, page, search, skip, take, where, _a, vouchers, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        items_per_page = Number(process.env.ITEMS_PER_PAGE);
                        page = Number(filter.page) || 1;
                        search = filter.search || "";
                        skip = (page - 1) * items_per_page;
                        take = items_per_page;
                        where = search
                            ? {
                                OR: [
                                    { code: { contains: search.toLowerCase() } },
                                    { description: { contains: search.toLowerCase() } },
                                    { percent: isNaN(Number(search)) ? undefined : Number(search) },
                                ]
                            }
                            : {};
                        return [4 /*yield*/, Promise.all([
                                this.prisma.voucher.findMany({
                                    where: where,
                                    skip: skip,
                                    take: items_per_page,
                                    orderBy: {
                                        id: 'desc'
                                    }
                                }),
                                this.prisma.voucher.count({ where: where }),
                            ])];
                    case 1:
                        _a = _b.sent(), vouchers = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                data: vouchers,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    VouchersService.prototype.getById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var voucher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.voucher.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        voucher = _a.sent();
                        if (!voucher) {
                            throw new common_1.NotFoundException("Voucher with ID " + id + " not found");
                        }
                        return [2 /*return*/, voucher];
                }
            });
        });
    };
    VouchersService.prototype.update = function (id, updateVoucherDto, user) {
        return __awaiter(this, void 0, Promise, function () {
            var existingVoucher, updatedVoucher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.voucher.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        existingVoucher = _a.sent();
                        if (!existingVoucher) {
                            throw new common_1.NotFoundException("Voucher with ID " + id + " not found");
                        }
                        return [4 /*yield*/, this.prisma.voucher.update({
                                where: { id: id },
                                data: __assign(__assign({}, updateVoucherDto), { updatedBy: user.sub })
                            })];
                    case 2:
                        updatedVoucher = _a.sent();
                        return [2 /*return*/, updatedVoucher];
                }
            });
        });
    };
    VouchersService.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, Promise, function () {
            var voucher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.voucher.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        voucher = _a.sent();
                        if (!voucher) {
                            throw new common_1.NotFoundException('Voucher not found');
                        }
                        return [4 /*yield*/, this.prisma.voucher.update({
                                where: { id: id },
                                data: {
                                    status: 'PAUSED',
                                    isActive: false,
                                    deletedBy: user.sub
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VouchersService.prototype.applyVoucher = function (orderId, voucherCode) {
        return __awaiter(this, void 0, Promise, function () {
            var order, voucher, discountAmount, updatedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.order.findUnique({
                            where: { id: orderId }
                        })];
                    case 1:
                        order = _a.sent();
                        if (!order) {
                            throw new Error('Order not found');
                        }
                        return [4 /*yield*/, this.prisma.voucher.findFirst({
                                where: {
                                    code: voucherCode,
                                    isActive: true
                                }
                            })];
                    case 2:
                        voucher = _a.sent();
                        if (!voucher) {
                            throw new Error('Voucher not found or is not active');
                        }
                        discountAmount = (order.totalPrice * voucher.percent) / 100;
                        return [4 /*yield*/, this.prisma.order.update({
                                where: { id: orderId },
                                data: {
                                    discountPrice: discountAmount,
                                    // totalPrice: order.totalPrice - discountAmount, // Cập nhật tổng tiền sau khi giảm
                                    usedVoucherId: voucher.id
                                }
                            })];
                    case 3:
                        updatedOrder = _a.sent();
                        return [2 /*return*/, updatedOrder];
                }
            });
        });
    };
    VouchersService.prototype.updateStatus = function (id, status, user) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prisma.voucher.update({
                        where: { id: id },
                        data: { status: status, updatedBy: user.sub },
                        select: { id: true, status: true, code: true, percent: true }
                    })];
            });
        });
    };
    VouchersService.prototype.saveVoucherForCustomer = function (voucherId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var voucher, existingCustomerVoucher, customer, _a, customerVoucher, _;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.prisma.voucher.findFirst({
                            where: { id: voucherId, isActive: true, status: 'ACTIVE' }
                        })];
                    case 1:
                        voucher = _b.sent();
                        if (!voucher) {
                            throw new common_1.NotFoundException('Voucher not found or is not active');
                        }
                        return [4 /*yield*/, this.prisma.customerVoucher.findUnique({
                                where: {
                                    userId_voucherId: {
                                        userId: user.sub,
                                        voucherId: voucherId
                                    }
                                }
                            })];
                    case 2:
                        existingCustomerVoucher = _b.sent();
                        if (existingCustomerVoucher) {
                            throw new common_1.BadRequestException('You have already saved this voucher');
                        }
                        return [4 /*yield*/, this.prisma.customer.findUnique({
                                where: { userId: user.sub }
                            })];
                    case 3:
                        customer = _b.sent();
                        if (!customer) {
                            throw new common_1.NotFoundException('Customer not found');
                        }
                        return [4 /*yield*/, this.prisma.$transaction([
                                this.prisma.customerVoucher.create({
                                    data: {
                                        userId: user.sub,
                                        voucherId: voucherId
                                    }
                                }),
                                this.prisma.customer.update({
                                    where: { userId: user.sub },
                                    data: { points: { decrement: voucher.pointCost } }
                                })
                            ])];
                    case 4:
                        _a = _b.sent(), customerVoucher = _a[0], _ = _a[1];
                        return [2 /*return*/, customerVoucher];
                }
            });
        });
    };
    VouchersService.prototype.getSavedVouchers = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var savedVouchers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.customerVoucher.findMany({
                            where: {
                                userId: user.sub
                            },
                            include: {
                                voucher: true
                            }
                        })];
                    case 1:
                        savedVouchers = _a.sent();
                        return [2 /*return*/, savedVouchers.map(function (savedVoucher) { return savedVoucher.voucher; })];
                }
            });
        });
    };
    VouchersService = __decorate([
        common_1.Injectable()
    ], VouchersService);
    return VouchersService;
}());
exports.VouchersService = VouchersService;
