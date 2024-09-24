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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var AuthService = /** @class */ (function () {
    function AuthService(prismaService, jwtService, userService, otpService, emailService, googleClient) {
        var _this = this;
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.otpService = otpService;
        this.emailService = emailService;
        this.googleClient = googleClient;
        this.register = function (userData) { return __awaiter(_this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prismaService.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                        var existingAccount, existingUser, hashedPassword, customerRole, newUser;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, prisma.user.findUnique({
                                        where: { username: userData.username }
                                    })];
                                case 1:
                                    existingAccount = _a.sent();
                                    if (existingAccount) {
                                        throw new common_1.HttpException({ message: 'This username has been used' }, common_1.HttpStatus.BAD_REQUEST);
                                    }
                                    return [4 /*yield*/, prisma.user.findUnique({
                                            where: { email: userData.email }
                                        })];
                                case 2:
                                    existingUser = _a.sent();
                                    if (existingUser) {
                                        throw new common_1.HttpException({ message: 'This email has been used' }, common_1.HttpStatus.BAD_REQUEST);
                                    }
                                    return [4 /*yield*/, bcrypt.hash(userData.password, 10)];
                                case 3:
                                    hashedPassword = _a.sent();
                                    return [4 /*yield*/, prisma.role.upsert({
                                            where: { name: 'CUSTOMER' },
                                            update: {},
                                            create: { name: 'CUSTOMER' }
                                        })];
                                case 4:
                                    customerRole = _a.sent();
                                    return [4 /*yield*/, prisma.user.create({
                                            data: {
                                                fullName: userData.fullName,
                                                email: userData.email,
                                                phone: userData.phone || null,
                                                username: userData.username,
                                                password: hashedPassword,
                                                role: {
                                                    connect: { id: customerRole.id }
                                                },
                                                avatar: userData.avatar || ''
                                            }
                                        })];
                                case 5:
                                    newUser = _a.sent();
                                    if (!(customerRole.name === 'CUSTOMER')) return [3 /*break*/, 7];
                                    return [4 /*yield*/, prisma.customer.create({
                                            data: {
                                                userId: newUser.id
                                            }
                                        })];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7: return [2 /*return*/, newUser];
                            }
                        });
                    }); })];
            });
        }); };
        this.login = function (data) { return __awaiter(_this, void 0, Promise, function () {
            var account, isPasswordValid, payload, accessToken, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.user.findUnique({
                            where: { username: data.username }
                        })];
                    case 1:
                        account = _a.sent();
                        console.log("ACCOUNT", account);
                        if (!account) {
                            throw new common_1.HttpException({ message: 'Account does not exist' }, common_1.HttpStatus.UNAUTHORIZED);
                        }
                        return [4 /*yield*/, bcrypt.compare(data.password, account.password)];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid) {
                            throw new common_1.HttpException({ message: 'Invalid password' }, common_1.HttpStatus.UNAUTHORIZED);
                        }
                        payload = {
                            username: account.username,
                            sub: account.id,
                            role: account.roleId,
                            fullName: account.fullName,
                            email: account.email,
                            avt: account.avatar
                        };
                        return [4 /*yield*/, this.jwtService.signAsync(payload, {
                                secret: process.env.JWT_SECRET,
                                expiresIn: '1h'
                            })];
                    case 3:
                        accessToken = _a.sent();
                        return [4 /*yield*/, this.jwtService.signAsync(payload, {
                                secret: process.env.JWT_SECRET,
                                expiresIn: '7d'
                            })];
                    case 4:
                        refreshToken = _a.sent();
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            }];
                }
            });
        }); };
    }
    AuthService.prototype.getPermissionsForUser = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var userWithPermissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.user.findUnique({
                            where: { id: userId },
                            include: {
                                role: {
                                    include: {
                                        permissions: {
                                            include: {
                                                permission: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        userWithPermissions = _a.sent();
                        // Trả về danh sách các quyền, mỗi quyền chứa apiPath, method, và module
                        return [2 /*return*/, userWithPermissions.role.permissions.map(function (rp) { return ({
                                apiPath: rp.permission.apiPath,
                                method: rp.permission.method,
                                module: rp.permission.module
                            }); })];
                }
            });
        });
    };
    AuthService.prototype.validateUser = function (username, password) {
        return __awaiter(this, void 0, Promise, function () {
            var user, _a, password_1, result, permissions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userService.findOne(username)];
                    case 1:
                        user = _b.sent();
                        _a = user;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (!_a) return [3 /*break*/, 5];
                        password_1 = user.password, result = __rest(user, ["password"]);
                        return [4 /*yield*/, this.getPermissionsForUser(user.id)];
                    case 4:
                        permissions = _b.sent();
                        // Trả về đối tượng kết quả với các permissions
                        return [2 /*return*/, __assign(__assign({}, result), { permissions: permissions })];
                    case 5: return [2 /*return*/, null];
                }
            });
        });
    };
    AuthService.prototype.sendPasswordResetOTP = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, otp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('User not found');
                        }
                        otp = this.otpService.generateOTP();
                        this.otpService.storeOTP(email, otp);
                        return [4 /*yield*/, this.emailService.sendOTP(email, otp)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: 'OTP sent to your email' }];
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (email, otp, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var isValidOTP, user, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isValidOTP = this.otpService.verifyOTP(email, otp);
                        if (!isValidOTP) {
                            throw new common_1.BadRequestException('Invalid or expired OTP');
                        }
                        return [4 /*yield*/, this.userService.findByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException('User not found');
                        }
                        return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.userService.updatePassword(user.id, hashedPassword)];
                    case 3:
                        _a.sent();
                        // Xóa OTP sau khi sử dụng
                        this.otpService.clearOTP(email);
                        return [2 /*return*/, { message: 'Password reset successfully' }];
                }
            });
        });
    };
    AuthService.prototype.googleLogin = function (credential) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, payload, email, user, randomPassword, hashedPassword, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.googleClient.verifyIdToken({
                                idToken: credential,
                                audience: process.env.GOOGLE_CLIENT_ID
                            })];
                    case 1:
                        ticket = _a.sent();
                        payload = ticket.getPayload();
                        email = payload.email;
                        return [4 /*yield*/, this.prismaService.user.findUnique({ where: { email: email } })];
                    case 2:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 5];
                        randomPassword = Math.random().toString(36).slice(-8);
                        return [4 /*yield*/, bcrypt.hash(randomPassword, 10)];
                    case 3:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.prismaService.user.create({
                                data: {
                                    email: email,
                                    fullName: payload.name,
                                    username: email,
                                    password: hashedPassword,
                                    avatar: payload.picture || '',
                                    role: {
                                        connect: { name: 'CUSTOMER' }
                                    }
                                }
                            })];
                    case 4:
                        // Tạo người dùng mới nếu chưa tồn tại
                        user = _a.sent();
                        _a.label = 5;
                    case 5:
                        token = this.jwtService.sign({
                            sub: user.id,
                            email: user.email,
                            fullName: user.fullName
                        }, {
                            secret: process.env.JWT_SECRET,
                            expiresIn: '30h'
                        });
                        console.log("user login gg", user);
                        console.log("tokennn", token);
                        return [2 /*return*/, { user: user, accessToken: token }];
                    case 6:
                        error_1 = _a.sent();
                        throw new Error('Failed to authenticate with Google');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
