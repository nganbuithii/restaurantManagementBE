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
exports.PaymentService = void 0;
var common_1 = require("@nestjs/common");
var crypto = require("crypto");
var querystring = require("querystring");
var moment_1 = require("moment");
var PaymentService = /** @class */ (function () {
    function PaymentService(configService) {
        this.configService = configService;
    }
    PaymentService.prototype.createVnpayPaymentUrl = function (createPaymentDto) {
        return __awaiter(this, void 0, Promise, function () {
            var orderId, amount, orderInfo, tmnCode, secretKey, vnpUrl, returnUrl, date, createDate, generatedOrderId, vnpParams, sortedParams, signData, hmac, signed;
            return __generator(this, function (_a) {
                orderId = createPaymentDto.orderId, amount = createPaymentDto.amount, orderInfo = createPaymentDto.orderInfo;
                tmnCode = this.configService.get('VNP_TMN_CODE');
                secretKey = this.configService.get('VNP_HASH_SECRET');
                console.log("KEYYYYY", secretKey);
                vnpUrl = this.configService.get('VNP_URL');
                returnUrl = this.configService.get('VNP_RETURN_URL');
                date = new Date();
                createDate = moment_1["default"](date).format('YYYYMMDDHHmmss');
                generatedOrderId = moment_1["default"](date).format('HHmmss');
                vnpParams = {
                    vnp_Version: '2.1.0',
                    vnp_Command: 'pay',
                    vnp_TmnCode: tmnCode,
                    vnp_Locale: 'vn',
                    vnp_CurrCode: 'VND',
                    vnp_TxnRef: orderId,
                    vnp_OrderInfo: orderInfo,
                    vnp_OrderType: 'other',
                    vnp_Amount: amount * 100,
                    vnp_ReturnUrl: returnUrl,
                    vnp_IpAddr: '127.0.0.1',
                    vnp_CreateDate: createDate
                };
                sortedParams = this.sortObject(vnpParams);
                signData = querystring.stringify(sortedParams);
                hmac = crypto.createHmac('sha512', secretKey);
                signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
                vnpParams['vnp_SecureHash'] = signed;
                return [2 /*return*/, vnpUrl + "?" + querystring.stringify(vnpParams)];
            });
        });
    };
    PaymentService.prototype.verifyReturnUrl = function (vnpParams) {
        return __awaiter(this, void 0, Promise, function () {
            var secretKey, secureHash, signData, hmac, signed;
            return __generator(this, function (_a) {
                secretKey = this.configService.get('VNP_HASH_SECRET');
                secureHash = vnpParams['vnp_SecureHash'];
                delete vnpParams['vnp_SecureHash'];
                delete vnpParams['vnp_SecureHashType'];
                vnpParams = this.sortObject(vnpParams);
                signData = querystring.stringify(vnpParams);
                hmac = crypto.createHmac("sha512", secretKey);
                signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
                return [2 /*return*/, secureHash === signed];
            });
        });
    };
    PaymentService.prototype.queryTransaction = function (orderId, transDate) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                // Implement VNPay transaction query logic here
                // This will depend on VNPay's API for querying transactions
                // You'll need to make an HTTP request to VNPay's query API
                throw new Error('Method not implemented.');
            });
        });
    };
    PaymentService.prototype.refundTransaction = function (refundData) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                // Implement VNPay refund logic here
                // This will depend on VNPay's API for refunding transactions
                // You'll need to make an HTTP request to VNPay's refund API
                throw new Error('Method not implemented.');
            });
        });
    };
    PaymentService.prototype.sortObject = function (obj) {
        var sorted = {};
        var str = [];
        var key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    };
    PaymentService = __decorate([
        common_1.Injectable()
    ], PaymentService);
    return PaymentService;
}());
exports.PaymentService = PaymentService;
