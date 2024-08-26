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
exports.RoleService = void 0;
var common_1 = require("@nestjs/common");
var RoleService = /** @class */ (function () {
    function RoleService(prismaService) {
        this.prismaService = prismaService;
    }
    RoleService.prototype.getOrCreateDefaultRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prismaService.role.upsert({
                        where: { name: 'CUSTOMER' },
                        update: {},
                        create: { name: 'CUSTOMER' }
                    })];
            });
        });
    };
    RoleService.prototype.create = function (body) {
        return __awaiter(this, void 0, Promise, function () {
            var existingRole;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.role.findUnique({
                            where: { name: body.name }
                        })];
                    case 1:
                        existingRole = _a.sent();
                        if (existingRole) {
                            throw new common_1.BadRequestException('Role with this name already exists');
                        }
                        // Tạo role mới nếu không bị trùng
                        return [2 /*return*/, this.prismaService.role.create({
                                data: body
                            })];
                }
            });
        });
    };
    RoleService.prototype.getAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prismaService.role.findMany()];
            });
        });
    };
    RoleService.prototype.getById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var role, detailedRole;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.role.findUnique({
                            where: { id: id },
                            include: {
                                permissions: {
                                    include: {
                                        permission: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        role = _a.sent();
                        if (!role) {
                            throw new common_1.NotFoundException("Role with ID " + id + " not found");
                        }
                        detailedRole = __assign(__assign({}, role), { permissions: role.permissions.map(function (rp) { return rp.permission; }) });
                        return [2 /*return*/, detailedRole];
                }
            });
        });
    };
    RoleService.prototype.update = function (id, name) {
        return __awaiter(this, void 0, Promise, function () {
            var role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.role.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        role = _a.sent();
                        if (!role) {
                            throw new common_1.NotFoundException("Role with ID " + id + " not found");
                        }
                        return [2 /*return*/, this.prismaService.role.update({
                                where: { id: id },
                                data: {
                                    name: name,
                                    updatedAt: new Date()
                                }
                            })];
                }
            });
        });
    };
    RoleService.prototype.assignPermissionsToRole = function (roleId, permissionIds) {
        return __awaiter(this, void 0, void 0, function () {
            var rolePermissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Xóa tất cả các quyền hiện tại của role
                    return [4 /*yield*/, this.prismaService.rolePermission.deleteMany({
                            where: { roleId: roleId }
                        })];
                    case 1:
                        // Xóa tất cả các quyền hiện tại của role
                        _a.sent();
                        rolePermissions = permissionIds.map(function (permissionId) { return ({
                            roleId: roleId,
                            permissionId: permissionId
                        }); });
                        return [4 /*yield*/, this.prismaService.rolePermission.createMany({
                                data: rolePermissions
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.prismaService.role.findUnique({
                                where: { id: roleId },
                                include: { permissions: true }
                            })];
                }
            });
        });
    };
    RoleService.prototype.updateRolePermissions = function (roleId, newPermissionIds) {
        return __awaiter(this, void 0, void 0, function () {
            var createPromises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Kiểm tra xem newPermissionIds có phải là một mảng không
                        if (!Array.isArray(newPermissionIds)) {
                            throw new common_1.BadRequestException('Permissions should be an array of numbers');
                        }
                        // Xóa tất cả quyền hiện tại của role
                        return [4 /*yield*/, this.prismaService.rolePermission.deleteMany({
                                where: { roleId: roleId }
                            })];
                    case 1:
                        // Xóa tất cả quyền hiện tại của role
                        _a.sent();
                        createPromises = newPermissionIds.map(function (permissionId) {
                            return _this.prismaService.rolePermission.create({
                                data: {
                                    roleId: roleId,
                                    permissionId: permissionId
                                }
                            });
                        });
                        return [4 /*yield*/, Promise.all(createPromises)];
                    case 2:
                        _a.sent();
                        // Trả về role với danh sách quyền mới
                        return [2 /*return*/, this.prismaService.role.findUnique({
                                where: { id: roleId },
                                include: {
                                    permissions: {
                                        include: {
                                            permission: true
                                        }
                                    }
                                }
                            })];
                }
            });
        });
    };
    RoleService = __decorate([
        common_1.Injectable()
    ], RoleService);
    return RoleService;
}());
exports.RoleService = RoleService;
