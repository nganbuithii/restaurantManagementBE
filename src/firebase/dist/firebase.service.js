"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FirebaseService = void 0;
var common_1 = require("@nestjs/common");
var app_1 = require("firebase/app");
var FirebaseService = /** @class */ (function () {
    function FirebaseService(configService) {
        this.configService = configService;
        this.app = app_1.initializeApp({
            apiKey: this.configService.get('apiKey'),
            authDomain: this.configService.get('authDomain'),
            projectId: this.configService.get('projectId'),
            storageBucket: this.configService.get('storageBucket'),
            messagingSenderId: this.configService.get('messagingSenderId'),
            appId: this.configService.get('appId'),
            measurementId: this.configService.get('measurementId')
        });
    }
    FirebaseService = __decorate([
        common_1.Injectable()
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
