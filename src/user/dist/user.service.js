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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var user_dto_1 = require("./dto/user.dto");
var bcrypt_1 = require("bcrypt");
var class_transformer_1 = require("class-transformer");
var date_fns_1 = require("date-fns");
var UserService = /** @class */ (function () {
    function UserService(prismaService, cloudinaryService) {
        this.prismaService = prismaService;
        this.cloudinaryService = cloudinaryService;
    }
    UserService.prototype.create = function (body) {
        return __awaiter(this, void 0, Promise, function () {
            var role, existingUser, existingAccount, hashedPassword, result, password, dataWithoutPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.role.findUnique({
                            where: { id: body.roleId }
                        })];
                    case 1:
                        role = _a.sent();
                        if (!role || !role.isActive) {
                            throw new common_1.HttpException({ message: 'Invalid or inactive role ID' }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.prismaService.user.findUnique({
                                where: {
                                    email: body.email
                                }
                            })];
                    case 2:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new common_1.HttpException({ message: 'This email is already in use' }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.prismaService.user.findUnique({
                                where: {
                                    username: body.username
                                }
                            })];
                    case 3:
                        existingAccount = _a.sent();
                        if (existingAccount) {
                            throw new common_1.HttpException({ message: 'This username has been used' }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, bcrypt_1.hash(body.password, 10)];
                    case 4:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.prismaService.user.create({
                                data: {
                                    email: body.email,
                                    phone: body.phone,
                                    fullName: body.fullName,
                                    username: body.username,
                                    password: hashedPassword,
                                    avatar: body.avatar || "https://res.cloudinary.com/dp0daqkme/image/upload/v1725284251/6932514_pxqscj.png",
                                    role: {
                                        connect: {
                                            id: body.roleId
                                        }
                                    }
                                }
                            })];
                    case 5:
                        result = _a.sent();
                        if (!(role.name !== 'ADMIN' && role.name !== 'CUSTOMER')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.prismaService.employee.create({
                                data: {
                                    userId: result.id,
                                    hireDate: new Date(),
                                    salary: 0,
                                    position: role.name
                                }
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        password = result.password, dataWithoutPassword = __rest(result, ["password"]);
                        return [2 /*return*/, dataWithoutPassword];
                }
            });
        });
    };
    UserService.prototype.getAll = function (filters) {
        return __awaiter(this, void 0, Promise, function () {
            var items_per_page, page, search, skip, users, userDtos, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items_per_page = Number(filters.items_per_page) || 4;
                        page = Number(filters.page) || 1;
                        search = filters.search || "";
                        skip = page > 1 ? (page - 1) * items_per_page : 0;
                        return [4 /*yield*/, this.prismaService.user.findMany({
                                take: items_per_page,
                                skip: skip,
                                where: {
                                    OR: [
                                        {
                                            fullName: {
                                                contains: search
                                            }
                                        },
                                        {
                                            email: {
                                                contains: search
                                            }
                                        },
                                        {
                                            username: {
                                                contains: search
                                            }
                                        },
                                        {
                                            role: {
                                                name: {
                                                    contains: search
                                                }
                                            }
                                        },
                                    ]
                                },
                                include: {
                                    role: true
                                },
                                orderBy: {
                                    createdAt: "desc"
                                }
                            })];
                    case 1:
                        users = _a.sent();
                        userDtos = users.map(function (user) {
                            var userDto = class_transformer_1.plainToClass(user_dto_1.UserDto, user);
                            userDto.roleName = user.role.name; // Gán tên vai trò vào DTO
                            return userDto;
                        });
                        return [4 /*yield*/, this.prismaService.user.count({
                                where: {
                                    OR: [
                                        {
                                            fullName: {
                                                contains: search
                                            }
                                        },
                                        {
                                            email: {
                                                contains: search
                                            }
                                        },
                                        {
                                            username: {
                                                contains: search
                                            }
                                        },
                                        {
                                            role: {
                                                name: {
                                                    contains: search
                                                }
                                            }
                                        },
                                    ]
                                }
                            })];
                    case 2:
                        total = _a.sent();
                        return [2 /*return*/, {
                                data: userDtos,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    UserService.prototype.getDetail = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var user, password, userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.user.findUnique({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with ID " + id + " not found");
                        }
                        password = user.password, userData = __rest(user, ["password"]);
                        return [2 /*return*/, userData];
                }
            });
        });
    };
    UserService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            var updateData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateData = __assign({}, data);
                        return [4 /*yield*/, this.prismaService.user.update({
                                where: {
                                    id: id
                                },
                                data: updateData
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getMe = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "hiii"];
            });
        });
    };
    UserService.prototype.findOne = function (username) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.user.findUnique({
                            where: { username: username }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with username " + username + " not found");
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.isValidPassword = function (password, hash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bcrypt_1.compareSync(password, hash)];
            });
        });
    };
    UserService.prototype.updateAvt = function (id, file) {
        return __awaiter(this, void 0, Promise, function () {
            var user, result, updatedUser, password, userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Kiểm tra xem id có hợp lệ không
                        if (!id) {
                            throw new common_1.BadRequestException('Invalid user ID');
                        }
                        return [4 /*yield*/, this.prismaService.user.findUnique({
                                where: { id: id }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with ID " + id + " not found");
                        }
                        return [4 /*yield*/, this.cloudinaryService.uploadImage(file)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.prismaService.user.update({
                                where: { id: id },
                                data: { avatar: result.secure_url }
                            })];
                    case 3:
                        updatedUser = _a.sent();
                        password = updatedUser.password, userData = __rest(updatedUser, ["password"]);
                        return [2 /*return*/, userData];
                }
            });
        });
    };
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.user.findUnique({
                            where: { email: email }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with email " + email + " not found");
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.updatePassword = function (userId, newPassword) {
        return __awaiter(this, void 0, Promise, function () {
            var updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.user.update({
                            where: { id: userId },
                            data: { password: newPassword }
                        })];
                    case 1:
                        updatedUser = _a.sent();
                        return [2 /*return*/, updatedUser];
                }
            });
        });
    };
    UserService.prototype.getUserWithRole = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.user.findUnique({
                            where: { id: userId }
                        })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.prismaService.role.findUnique({
                                where: { id: user.roleId }
                            })];
                    case 2:
                        role = _a.sent();
                        return [2 /*return*/, __assign(__assign({}, user), { roleName: role === null || role === void 0 ? void 0 : role.name })];
                }
            });
        });
    };
    UserService.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, Promise, function () {
            var u;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.user.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        u = _a.sent();
                        if (!u) {
                            throw new common_1.NotFoundException("user with id " + id + " not found");
                        }
                        return [4 /*yield*/, this.prismaService.user.update({
                                where: { id: id },
                                data: {
                                    isActive: false,
                                    updatedAt: new Date()
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.countNewCustomers = function (month, year) {
        if (month === void 0) { month = new Date().getMonth() + 1; }
        if (year === void 0) { year = new Date().getFullYear(); }
        return __awaiter(this, void 0, Promise, function () {
            var start, end, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = date_fns_1.startOfMonth(date_fns_1.parse(year + "-" + month + "-01", 'yyyy-M-d', new Date()));
                        end = date_fns_1.endOfMonth(start);
                        return [4 /*yield*/, this.prismaService.user.count({
                                where: {
                                    createdAt: {
                                        gte: start,
                                        lte: end
                                    }
                                }
                            })];
                    case 1:
                        count = _a.sent();
                        return [2 /*return*/, count];
                }
            });
        });
    };
    UserService = __decorate([
        common_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
