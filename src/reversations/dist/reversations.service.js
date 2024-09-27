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
exports.ReversationsService = void 0;
var common_1 = require("@nestjs/common");
var ReversationsService = /** @class */ (function () {
    function ReversationsService(prisma, emailService) {
        this.prisma = prisma;
        this.emailService = emailService;
    }
    ReversationsService.prototype.create = function (createReservationDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var tableId, time, date, status, reservationDateTime, existingReservations, _i, existingReservations_1, reservation, existingDateTime, newReservation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tableId = createReservationDto.tableId, time = createReservationDto.time, date = createReservationDto.date, status = createReservationDto.status;
                        reservationDateTime = new Date(new Date(date).toISOString().split('T')[0] + "T" + time + ":00");
                        console.log('Reservation DateTime:', reservationDateTime.toISOString());
                        return [4 /*yield*/, this.prisma.reservation.findMany({
                                where: {
                                    table: {
                                        id: tableId
                                    },
                                    date: {
                                        gte: new Date(reservationDateTime.toISOString().split('T')[0] + "T00:00:00Z"),
                                        lt: new Date(reservationDateTime.toISOString().split('T')[0] + "T23:59:59Z")
                                    },
                                    status: {
                                        not: 'CANCELLED'
                                    }
                                },
                                select: {
                                    time: true,
                                    date: true
                                }
                            })];
                    case 1:
                        existingReservations = _a.sent();
                        console.log('Existing Reservations:', existingReservations);
                        for (_i = 0, existingReservations_1 = existingReservations; _i < existingReservations_1.length; _i++) {
                            reservation = existingReservations_1[_i];
                            existingDateTime = new Date(reservation.date.toISOString().split('T')[0] + "T" + reservation.time + ":00");
                            console.log('Comparing with Existing Reservation DateTime:', existingDateTime.toISOString());
                            if (reservationDateTime.getTime() === existingDateTime.getTime()) {
                                throw new common_1.BadRequestException('Table is already reserved for the selected time');
                            }
                        }
                        return [4 /*yield*/, this.prisma.reservation.create({
                                data: {
                                    time: time,
                                    date: reservationDateTime,
                                    status: status || 'PENDING',
                                    user: {
                                        connect: { id: user.sub }
                                    },
                                    table: {
                                        connect: { id: tableId }
                                    }
                                }
                            })];
                    case 2:
                        newReservation = _a.sent();
                        console.log('New Reservation Created:', newReservation);
                        return [4 /*yield*/, this.emailService.sendReservationConfirmation(user.email, {
                                date: newReservation.date,
                                time: newReservation.time,
                                status: newReservation.status
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, newReservation];
                }
            });
        });
    };
    ReversationsService.prototype.getAll = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, page, _b, items_per_page, search, skip, where, total, reservations;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.page, page = _a === void 0 ? 1 : _a, _b = params.items_per_page, items_per_page = _b === void 0 ? 4 : _b, search = params.search;
                        skip = (page - 1) * items_per_page;
                        where = search
                            ? {
                                OR: [
                                    { status: { contains: search } },
                                    {
                                        user: {
                                            fullName: {
                                                contains: search
                                            }
                                        }
                                    },
                                    { table: { number: { equals: parseInt(search) || -1 } } },
                                ]
                            }
                            : {};
                        return [4 /*yield*/, this.prisma.reservation.count({ where: where })];
                    case 1:
                        total = _c.sent();
                        return [4 /*yield*/, this.prisma.reservation.findMany({
                                where: where,
                                skip: skip,
                                take: items_per_page,
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            fullName: true,
                                            username: true
                                        }
                                    }
                                },
                                orderBy: { createdAt: 'desc' }
                            })];
                    case 2:
                        reservations = _c.sent();
                        return [2 /*return*/, {
                                data: reservations,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    ReversationsService.prototype.getDetail = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var reservation, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.reservation.findUnique({
                            where: { id: id },
                            include: {
                                user: true,
                                table: true,
                                order: {
                                    include: {
                                        details: {
                                            include: {
                                                menuItem: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        reservation = _a.sent();
                        if (!reservation) {
                            throw new common_1.NotFoundException("Reservation with ID " + id + " not found");
                        }
                        data = {
                            id: reservation.id,
                            time: reservation.time,
                            date: reservation.date,
                            status: reservation.status,
                            createdAt: reservation.createdAt,
                            updatedAt: reservation.updatedAt,
                            userId: reservation.userId,
                            table: reservation.table ? {
                                id: reservation.table.id,
                                number: reservation.table.number
                            } : null,
                            user: {
                                id: reservation.user.id,
                                fullName: reservation.user.fullName,
                                phone: reservation.user.phone,
                                username: reservation.user.username,
                                avatar: reservation.user.avatar
                            },
                            order: reservation.order ? {
                                id: reservation.order.id,
                                totalPrice: reservation.order.totalPrice,
                                discountPrice: reservation.order.discountPrice,
                                details: reservation.order.details.map(function (detail) { return ({
                                    id: detail.id,
                                    quantity: detail.quantity,
                                    menuItem: {
                                        name: detail.menuItem.name,
                                        price: detail.menuItem.price
                                    }
                                }); })
                            } : null
                        };
                        return [2 /*return*/, { data: data }];
                }
            });
        });
    };
    ReversationsService.prototype.update = function (id, data, user) {
        return __awaiter(this, void 0, Promise, function () {
            var reservation, updateData, updatedReservation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.reservation.findUnique({
                            where: { id: id },
                            include: { menuItems: true }
                        })];
                    case 1:
                        reservation = _a.sent();
                        if (!reservation) {
                            throw new common_1.NotFoundException('Reservation not found');
                        }
                        console.log("Data sent for updating reservation:", data);
                        updateData = __assign(__assign({}, data), { updatedAt: new Date() });
                        // If menuItemIds is provided, update the menu items
                        if (data.menuItemIds) {
                            updateData.menuItems = {
                                set: data.menuItemIds.map(function (menuItemId) { return ({ id: menuItemId }); })
                            };
                            // Remove menuItemIds from updateData as it's not a direct field of Reservation
                            delete updateData.menuItemIds;
                        }
                        return [4 /*yield*/, this.prisma.reservation.update({
                                where: { id: id },
                                data: updateData,
                                include: {
                                    menuItems: true,
                                    user: true,
                                    table: true,
                                    order: true
                                }
                            })];
                    case 2:
                        updatedReservation = _a.sent();
                        return [2 /*return*/, updatedReservation];
                }
            });
        });
    };
    ReversationsService.prototype.changeStatus = function (id, status, user) {
        return __awaiter(this, void 0, Promise, function () {
            var reservation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.reservation.findUnique({ where: { id: id } })];
                    case 1:
                        reservation = _a.sent();
                        if (!reservation) {
                            throw new common_1.NotFoundException('Reservation not found');
                        }
                        return [2 /*return*/, this.prisma.reservation.update({
                                where: { id: id },
                                data: { status: status }
                            })];
                }
            });
        });
    };
    ReversationsService.prototype.getAllByUserId = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prisma.reservation.findMany({
                        where: {
                            userId: user.sub
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    })];
            });
        });
    };
    ReversationsService = __decorate([
        common_1.Injectable()
    ], ReversationsService);
    return ReversationsService;
}());
exports.ReversationsService = ReversationsService;
