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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var AuthService = /** @class */ (function () {
    function AuthService(prismaService, jwtService, userService) {
        var _this = this;
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.register = function (userData) { return __awaiter(_this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.prismaService.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                        var existingAccount, existingUser, hashedPassword, defaultRole, newAccount, newUser;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.prismaService.account.findUnique({
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
                                    hashedPassword = crypto_1.createHash('sha256').update(userData.password).digest('hex');
                                    return [4 /*yield*/, prisma.role.upsert({
                                            where: { name: 'NORMAL_USER' },
                                            update: {},
                                            create: { name: 'NORMAL_USER' }
                                        })];
                                case 3:
                                    defaultRole = _a.sent();
                                    return [4 /*yield*/, prisma.account.create({
                                            data: {
                                                username: userData.username,
                                                password: hashedPassword,
                                                role: { connect: { id: defaultRole.id } }
                                            }
                                        })];
                                case 4:
                                    newAccount = _a.sent();
                                    return [4 /*yield*/, prisma.user.create({
                                            data: {
                                                fullName: userData.fullName,
                                                email: userData.email,
                                                phone: userData.phone || null,
                                                account: { connect: { id: newAccount.id } }
                                            }
                                        })];
                                case 5:
                                    newUser = _a.sent();
                                    return [2 /*return*/, newUser];
                            }
                        });
                    }); })];
            });
        }); };
        this.login = function (data) { return __awaiter(_this, void 0, Promise, function () {
            var account, payload, accessToken, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prismaService.account.findUnique({
                            where: { username: data.username }
                        })];
                    case 1:
                        account = _a.sent();
                        if (!account) {
                            throw new common_1.HttpException({ message: 'Account does not exist' }, common_1.HttpStatus.UNAUTHORIZED);
                        }
                        // So sánh mật khẩu đã băm
                        if (account.password !== account.password) {
                            throw new common_1.HttpException({ message: 'Invalid password' }, common_1.HttpStatus.UNAUTHORIZED);
                        }
                        payload = {
                            username: account.username,
                            sub: account.id
                        };
                        return [4 /*yield*/, this.jwtService.signAsync(payload, {
                                secret: process.env.JWT_SECRET,
                                expiresIn: '1h'
                            })];
                    case 2:
                        accessToken = _a.sent();
                        return [4 /*yield*/, this.jwtService.signAsync(payload, {
                                secret: process.env.JWT_SECRET,
                                expiresIn: '7d'
                            })];
                    case 3:
                        refreshToken = _a.sent();
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            }];
                }
            });
        }); };
    }
    AuthService.prototype.validateUser = function (username, pass) {
        return __awaiter(this, void 0, Promise, function () {
            var user, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.findOne(username)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            isValid = this.userService.isValidPassword(pass, user.password);
                            if (isValid) {
                                return [2 /*return*/, user];
                            }
                        }
                        return [2 /*return*/, null];
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
