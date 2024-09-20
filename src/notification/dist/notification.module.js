"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationModule = void 0;
var common_1 = require("@nestjs/common");
var notification_service_1 = require("./notification.service");
var notification_controller_1 = require("./notification.controller");
var firebase_admin_provider_1 = require("./firebase-admin.provider");
var jwt_1 = require("@nestjs/jwt");
var config_1 = require("@nestjs/config");
var NotificationModule = /** @class */ (function () {
    function NotificationModule() {
    }
    NotificationModule = __decorate([
        common_1.Module({
            imports: [jwt_1.JwtModule,],
            controllers: [notification_controller_1.NotificationController],
            providers: [firebase_admin_provider_1.firebaseAdminProvider, notification_service_1.NotificationService, config_1.ConfigService]
        })
    ], NotificationModule);
    return NotificationModule;
}());
exports.NotificationModule = NotificationModule;
