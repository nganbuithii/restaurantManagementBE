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
var querystring = require("qs");
var moment_1 = require("moment");
var orders_dto_1 = require("src/orders/dto/orders.dto");
var PaymentService = /** @class */ (function () {
    function PaymentService(configService, orderService) {
        this.configService = configService;
        this.orderService = orderService;
    }
    PaymentService.prototype.createPaymentUrl = function (orderId, amount, bankCode) {
        var tmnCode = this.configService.get('VNPAY_TMN_CODE');
        var secretKey = this.configService.get('VNP_HASH_SECRET');
        var returnUrl = this.configService.get('VNP_RETURN_URL');
        console.log("hash key", secretKey);
        var createDate = moment_1["default"]().format('YYYYMMDDHHmmss');
        var expireDate = moment_1["default"]().add(15, 'minutes').format('YYYYMMDDHHmmss');
        var vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: tmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: "Thanh toan cho ma GD:" + orderId,
            vnp_OrderType: 'other',
            vnp_Amount: amount * 100,
            vnp_ReturnUrl: returnUrl,
            vnp_IpAddr: '127.0.0.1',
            vnp_CreateDate: createDate
        };
        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }
        console.log("poarams", vnp_Params);
        var redirectUrl = new URL('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
        Object.entries(vnp_Params)
            .sort(function (_a, _b) {
            var key1 = _a[0];
            var key2 = _b[0];
            return key1.localeCompare(key2);
        })
            .forEach(function (_a) {
            var key = _a[0], value = _a[1];
            // Skip empty value
            if (!value || value === "" || value === undefined || value === null) {
                return;
            }
            redirectUrl.searchParams.append(key, value.toString());
        });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac
            .update(Buffer.from(redirectUrl.searchParams.toString(), 'utf-8'))
            .digest("hex");
        redirectUrl.searchParams.append("vnp_SecureHash", signed);
        return redirectUrl.href;
    };
    PaymentService.prototype.verifyPayment = function (query, secretKey) {
        return __awaiter(this, void 0, Promise, function () {
            var hashData, secureHash;
            return __generator(this, function (_a) {
                hashData = Object.keys(query)
                    .filter(function (key) { return key.startsWith('vnp_') && key !== 'vnp_SecureHash'; })
                    .map(function (key) { return key + "=" + query[key]; })
                    .join('&');
                secureHash = crypto.createHmac('sha256', secretKey)
                    .update(hashData)
                    .digest('hex')
                    .toUpperCase();
                return [2 /*return*/, secureHash === query.vnp_SecureHash];
            });
        });
    };
    PaymentService.prototype.handlePaymentReturn = function (vnpayData, user) {
        return __awaiter(this, void 0, void 0, function () {
            var vnp_PayDate, vnp_TransactionStatus, vnp_TxnRef, vnp_ResponseCode, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vnp_PayDate = vnpayData.vnp_PayDate, vnp_TransactionStatus = vnpayData.vnp_TransactionStatus, vnp_TxnRef = vnpayData.vnp_TxnRef, vnp_ResponseCode = vnpayData.vnp_ResponseCode;
                        console.log("Processing payment return...");
                        console.log("vnp_PayDate:", vnp_PayDate);
                        console.log("vnp_TransactionStatus:", vnp_TransactionStatus);
                        console.log("vnp_TransactionNo:", vnp_TxnRef);
                        console.log("vnp_ResponseCode:", vnp_ResponseCode);
                        if (!(vnp_ResponseCode === '00' && vnp_TransactionStatus === '00')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.orderService.updateStatus(Number(vnp_TxnRef), orders_dto_1.OrderStatus.COMPLETED, user)];
                    case 1:
                        order = _a.sent();
                        if (order) {
                            return [2 /*return*/, {
                                    message: 'Payment processed successfully!',
                                    orderId: vnp_TxnRef,
                                    status: orders_dto_1.OrderStatus.COMPLETED
                                }];
                        }
                        else {
                            throw new Error('Order not found or could not be updated.');
                        }
                        return [3 /*break*/, 3];
                    case 2: throw new Error('Payment failed or was not successful.');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PaymentService.prototype.queryTransaction = function (orderId, transDate) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    PaymentService.prototype.refundTransaction = function (refundData) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    PaymentService.prototype.verifyReturnUrl = function (params, secureHash) {
        var sortedParams = this.sortObject(params);
        var signData = querystring.stringify(sortedParams);
        var calculatedHash = this.generateSecureHash(signData);
        return calculatedHash === secureHash;
    };
    PaymentService.prototype.sortObject = function (obj) {
        var sorted = {};
        var str = Object.keys(obj).sort();
        str.forEach(function (key) {
            if (obj[key] !== undefined && obj[key] !== null) {
                sorted[key] = obj[key].toString();
            }
        });
        return sorted;
    };
    PaymentService.prototype.formatDateTime = function (date) {
        return moment_1["default"](date).format('YYYYMMDDHHmmss');
    };
    PaymentService.prototype.generateSecureHash = function (data) {
        var hmac = crypto.createHmac('sha512', process.env.VNP_HASH_SECRET);
        return hmac.update(Buffer.from(data, 'utf-8')).digest('hex');
    };
    PaymentService = __decorate([
        common_1.Injectable()
    ], PaymentService);
    return PaymentService;
}());
exports.PaymentService = PaymentService;
