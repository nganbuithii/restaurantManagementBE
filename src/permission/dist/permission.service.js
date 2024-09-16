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
exports.PermissionService = void 0;
var common_1 = require("@nestjs/common");
var PermissionService = /** @class */ (function () {
    function PermissionService(prismaService) {
        this.prismaService = prismaService;
    }
    PermissionService.prototype.create = function (createPermissionDto) {
        return __awaiter(this, void 0, void 0, function () {
            var apiPath, method, module, description, existingPermission, permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiPath = createPermissionDto.apiPath, method = createPermissionDto.method, module = createPermissionDto.module, description = createPermissionDto.description;
                        return [4 /*yield*/, this.prismaService.permission.findFirst({
                                where: { apiPath: apiPath, method: method, module: module }
                            })];
                    case 1:
                        existingPermission = _a.sent();
                        if (existingPermission) {
                            throw new common_1.HttpException({ message: 'Permission already exists' }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.prismaService.permission.create({
                                data: {
                                    apiPath: apiPath,
                                    method: method,
                                    module: module,
                                    description: description
                                }
                            })];
                    case 2:
                        permission = _a.sent();
                        return [2 /*return*/, permission];
                }
            });
        });
    };
    PermissionService.prototype.getAll = function (filters) {
        return __awaiter(this, void 0, Promise, function () {
            var items_per_page, page, search, skip, permissions, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items_per_page = Number(process.env.ITEMS_PER_PAGE);
                        page = Number(filters.page) || 1;
                        search = filters.search || "";
                        skip = page > 1 ? (page - 1) * items_per_page : 0;
                        return [4 /*yield*/, this.prismaService.permission.findMany({
                                take: items_per_page,
                                skip: skip,
                                where: {
                                    deletedAt: null,
                                    OR: [
                                        {
                                            apiPath: {
                                                contains: search
                                            }
                                        },
                                        {
                                            description: {
                                                contains: search
                                            }
                                        },
                                    ]
                                },
                                orderBy: {
                                    createdAt: "desc"
                                }
                            })];
                    case 1:
                        permissions = _a.sent();
                        return [4 /*yield*/, this.prismaService.permission.count({
                                where: {
                                    apiPath: {
                                        contains: search
                                    }
                                }
                            })];
                    case 2:
                        total = _a.sent();
                        return [2 /*return*/, {
                                data: permissions,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    PermissionService.prototype.getDetail = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.permission.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        permission = _a.sent();
                        if (!permission) {
                            throw new common_1.NotFoundException({
                                statusCode: common_1.HttpStatus.NOT_FOUND,
                                message: "Permission with ID " + id + " not found"
                            });
                        }
                        return [2 /*return*/, permission];
                }
            });
        });
    };
    PermissionService.prototype.update = function (id, data) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, Promise, function () {
            var permission, updatedPermission;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.prismaService.permission.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        permission = _e.sent();
                        if (!permission) {
                            throw new common_1.NotFoundException({
                                statusCode: common_1.HttpStatus.NOT_FOUND,
                                message: "Permission with ID " + id + " not found"
                            });
                        }
                        return [4 /*yield*/, this.prismaService.permission.update({
                                where: { id: id },
                                data: {
                                    apiPath: (_a = data.apiPath) !== null && _a !== void 0 ? _a : permission.apiPath,
                                    method: (_b = data.method) !== null && _b !== void 0 ? _b : permission.method,
                                    module: (_c = data.module) !== null && _c !== void 0 ? _c : permission.module,
                                    description: (_d = data.description) !== null && _d !== void 0 ? _d : permission.description
                                }
                            })];
                    case 2:
                        updatedPermission = _e.sent();
                        return [2 /*return*/, updatedPermission];
                }
            });
        });
    };
    PermissionService.prototype.remove = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.permission.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        permission = _a.sent();
                        if (!permission) {
                            throw new common_1.NotFoundException({
                                statusCode: common_1.HttpStatus.NOT_FOUND,
                                message: "Permission with ID " + id + " not found"
                            });
                        }
                        return [4 /*yield*/, this.prismaService.permission.update({
                                where: { id: id },
                                data: { deletedAt: new Date() }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PermissionService.prototype.getRolePermissions = function (roleId) {
        return __awaiter(this, void 0, Promise, function () {
            var roleWithPermissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.role.findUnique({
                            where: { id: roleId },
                            include: {
                                permissions: {
                                    include: {
                                        permission: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        roleWithPermissions = _a.sent();
                        return [2 /*return*/, roleWithPermissions.permissions.map(function (rp) { return rp.permission.apiPath; })];
                }
            });
        });
    };
    PermissionService.prototype.hasPermission = function (roleId, requiredPermission) {
        return __awaiter(this, void 0, Promise, function () {
            var permissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRolePermissions(roleId)];
                    case 1:
                        permissions = _a.sent();
                        return [2 /*return*/, permissions.includes(requiredPermission)];
                }
            });
        });
    };
    PermissionService = __decorate([
        common_1.Injectable()
    ], PermissionService);
    return PermissionService;
}());
exports.PermissionService = PermissionService;
