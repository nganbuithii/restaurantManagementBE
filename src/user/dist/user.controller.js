"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var platform_express_1 = require("@nestjs/platform-express");
var config_1 = require("helper/config");
var path_1 = require("path");
var swagger_1 = require("@nestjs/swagger");
var permission_1 = require("decorators/permission");
var customize_1 = require("decorators/customize");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.create = function (body) {
        return this.userService.create(body);
    };
    UserController.prototype.getAll = function (params) {
        return this.userService.getAll(params);
    };
    UserController.prototype.getDetail = function (id) {
        return this.userService.getDetail(id);
    };
    UserController.prototype.update = function (id, data) {
        return this.userService.update(id, data);
    };
    UserController.prototype.uploadAvatar = function (req, file) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.fileValidationErr) {
                            throw new common_1.BadRequestException(req.fileValidationErr);
                        }
                        if (!file) {
                            throw new common_1.BadRequestException('File is required');
                        }
                        console.log('File:', file);
                        console.log('User:', req.user);
                        console.log('Upload avatar');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userService.updateAvt(req.user.sub, file)];
                    case 2:
                        updatedUser = _a.sent();
                        return [2 /*return*/, updatedUser];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error updating avatar:', error_1.message);
                        throw new common_1.BadRequestException('Failed to update avatar');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (id, user) {
        return this.userService["delete"](id, user);
    };
    __decorate([
        common_1.Post(),
        permission_1.RequirePermissions('CREATE_USER'),
        __param(0, common_1.Body())
    ], UserController.prototype, "create");
    __decorate([
        common_1.Get(),
        permission_1.RequirePermissions('GET_USER'),
        __param(0, common_1.Query())
    ], UserController.prototype, "getAll");
    __decorate([
        common_1.Get(':id'),
        permission_1.RequirePermissions('GET_USER'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe))
    ], UserController.prototype, "getDetail");
    __decorate([
        common_1.Patch(':id'),
        permission_1.RequirePermissions('UPDATE_USER'),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body())
    ], UserController.prototype, "update");
    __decorate([
        common_1.Post('upload-avt'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        permission_1.RequirePermissions('UPDATE_AVATAR_USER'),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('avatar', {
            storage: config_1.storageConfig('avatar'),
            fileFilter: function (req, file, cb) {
                var ext = path_1.extname(file.originalname).toLowerCase();
                var allowedExtArr = ['.jpg', '.png', '.jpeg'];
                if (!allowedExtArr.includes(ext)) {
                    req.fileValidationErr = "Wrong extension type. Accepted types are: " + allowedExtArr.join(', ');
                    return cb(null, false);
                }
                cb(null, true);
            }
        })),
        __param(0, common_1.Req()), __param(1, common_1.UploadedFile())
    ], UserController.prototype, "uploadAvatar");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
        customize_1.ResponseMessage(" delete user by id"),
        __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, customize_1.CurrentUser())
    ], UserController.prototype, "deleteUser");
    UserController = __decorate([
        swagger_1.ApiTags("Users"),
        common_1.Controller('users')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
