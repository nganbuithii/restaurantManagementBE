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
exports.TableService = void 0;
var common_1 = require("@nestjs/common");
var TableService = /** @class */ (function () {
    function TableService(prisma) {
        this.prisma = prisma;
    }
    TableService.prototype.create = function (createTableDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var number, existingTable, newTable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        number = createTableDto.number;
                        return [4 /*yield*/, this.prisma.table.findUnique({
                                where: { number: number }
                            })];
                    case 1:
                        existingTable = _a.sent();
                        if (existingTable) {
                            throw new common_1.BadRequestException('Table with this number already exists');
                        }
                        return [4 /*yield*/, this.prisma.table.create({
                                data: __assign({}, createTableDto)
                            })];
                    case 2:
                        newTable = _a.sent();
                        return [2 /*return*/, newTable];
                }
            });
        });
    };
    TableService.prototype.getAll = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, page, _b, items_per_page, search, offset, where, tables, total;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = params.page, page = _a === void 0 ? 1 : _a, _b = params.items_per_page, items_per_page = _b === void 0 ? 10 : _b, search = params.search;
                        offset = (page - 1) * items_per_page;
                        where = search ? { number: Number(search) } : {};
                        return [4 /*yield*/, this.prisma.table.findMany({
                                where: where,
                                skip: offset,
                                take: items_per_page
                            })];
                    case 1:
                        tables = _c.sent();
                        return [4 /*yield*/, this.prisma.table.count({ where: where })];
                    case 2:
                        total = _c.sent();
                        return [2 /*return*/, {
                                data: tables,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    TableService.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, Promise, function () {
            var table;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.table.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        table = _a.sent();
                        if (!table) {
                            throw new common_1.NotFoundException('Table not found');
                        }
                        return [4 /*yield*/, this.prisma.table.update({
                                where: { id: id },
                                data: {
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
    TableService.prototype.getAvailableTables = function (date, time) {
        return __awaiter(this, void 0, Promise, function () {
            var requestedDateTime, allTables, bookedTables, bookedTableIds, availableTables;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestedDateTime = new Date(date + "T" + time + ":00Z");
                        return [4 /*yield*/, this.prisma.table.findMany({
                                where: { isActive: true }
                            })];
                    case 1:
                        allTables = _a.sent();
                        return [4 /*yield*/, this.prisma.reservation.findMany({
                                where: {
                                    date: new Date(date),
                                    time: time,
                                    status: { "in": ['PENDING', 'CONFIRMED'] }
                                },
                                select: { tableId: true }
                            })];
                    case 2:
                        bookedTables = _a.sent();
                        bookedTableIds = bookedTables.map(function (reservation) { return reservation.tableId; });
                        console.log("Booked Table IDs:", bookedTableIds);
                        availableTables = allTables.filter(function (table) { return !bookedTableIds.includes(table.id); });
                        return [2 /*return*/, availableTables];
                }
            });
        });
    };
    TableService = __decorate([
        common_1.Injectable()
    ], TableService);
    return TableService;
}());
exports.TableService = TableService;
