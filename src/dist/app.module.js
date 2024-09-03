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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./auth/auth.module");
var role_module_1 = require("./role/role.module");
var core_1 = require("@nestjs/core");
var user_module_1 = require("./user/user.module");
var config_1 = require("@nestjs/config");
var jwt_1 = require("@nestjs/jwt");
var permission_module_1 = require("./permission/permission.module");
var menu_item_module_1 = require("./menu-item/menu-item.module");
var jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
var cloudinary_service_1 = require("./cloudinary/cloudinary.service");
var cloudinary_module_1 = require("./cloudinary/cloudinary.module");
var ingredient_module_1 = require("./ingredient/ingredient.module");
var menu_module_1 = require("./menu/menu.module");
var table_module_1 = require("./table/table.module");
var reversations_module_1 = require("./reversations/reversations.module");
var orders_module_1 = require("./orders/orders.module");
var feedbacks_module_1 = require("./feeckbacks/feedbacks.module");
var vouchers_module_1 = require("./vouchers/vouchers.module");
var suppliers_module_1 = require("./suppliers/suppliers.module");
var warehouse_slips_module_1 = require("./warehouse-slips/warehouse-slips.module");
var email_module_1 = require("./email/email.module");
var otp_service_1 = require("./otp/otp.service");
var inventory_module_1 = require("./inventory/inventory.module");
var prisma_service_1 = require("./prisma.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot(),
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, ({
                                    secret: configService.get('JWT_SECRET'),
                                    signOptions: { expiresIn: '60m' }
                                })];
                        });
                    }); },
                    inject: [config_1.ConfigService]
                }),
                config_1.ConfigModule,
                user_module_1.UserModule,
                auth_module_1.AuthModule, role_module_1.RoleModule, permission_module_1.PermissionModule, menu_item_module_1.MenuItemModule, cloudinary_module_1.CloudinaryModule, ingredient_module_1.IngredientModule, menu_module_1.MenuModule, table_module_1.TableModule, reversations_module_1.ReversationsModule, orders_module_1.OrdersModule, feedbacks_module_1.FeeckbacksModule, vouchers_module_1.VouchersModule, suppliers_module_1.SuppliersModule, warehouse_slips_module_1.WarehouseSlipsModule, email_module_1.EmailModule, inventory_module_1.InventoryModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                jwt_auth_guard_1.JwtAuthGuard,
                app_service_1.AppService,
                {
                    provide: core_1.APP_PIPE,
                    useClass: common_1.ValidationPipe
                },
                cloudinary_service_1.CloudinaryService,
                otp_service_1.OtpService,
                prisma_service_1.PrismaService
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
