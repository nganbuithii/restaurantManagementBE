"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OtpService = void 0;
var common_1 = require("@nestjs/common");
var OtpService = /** @class */ (function () {
    function OtpService() {
        this.otpStore = new Map();
    }
    OtpService.prototype.generateOTP = function () {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };
    OtpService.prototype.storeOTP = function (email, otp) {
        var expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 3);
        this.otpStore.set(email, { otp: otp, expiry: expiry });
    };
    OtpService.prototype.verifyOTP = function (email, otp) {
        var storedOTP = this.otpStore.get(email);
        if (!storedOTP)
            return false;
        if (new Date() > storedOTP.expiry) {
            this.otpStore["delete"](email);
            return false;
        }
        return storedOTP.otp === otp;
    };
    OtpService.prototype.clearOTP = function (email) {
        this.otpStore["delete"](email);
    };
    OtpService = __decorate([
        common_1.Injectable()
    ], OtpService);
    return OtpService;
}());
exports.OtpService = OtpService;
