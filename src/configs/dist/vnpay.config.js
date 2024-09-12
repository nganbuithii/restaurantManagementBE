"use strict";
exports.__esModule = true;
exports.VNPayConfig = void 0;
var VNPayConfig = /** @class */ (function () {
    function VNPayConfig(configService) {
        this.configService = configService;
    }
    Object.defineProperty(VNPayConfig.prototype, "tmnCode", {
        get: function () {
            return this.configService.get('VNPAY_TMN_CODE');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VNPayConfig.prototype, "hashSecret", {
        get: function () {
            return this.configService.get('VNPAY_HASH_SECRET');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VNPayConfig.prototype, "url", {
        get: function () {
            return this.configService.get('VNPAY_URL');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VNPayConfig.prototype, "returnUrl", {
        get: function () {
            return this.configService.get('VNPAY_RETURN_URL');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VNPayConfig.prototype, "version", {
        get: function () {
            return '2.1.0';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VNPayConfig.prototype, "command", {
        get: function () {
            return 'pay';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VNPayConfig.prototype, "currCode", {
        get: function () {
            return 'VND';
        },
        enumerable: false,
        configurable: true
    });
    return VNPayConfig;
}());
exports.VNPayConfig = VNPayConfig;
