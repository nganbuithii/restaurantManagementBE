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
exports.PaymentController = void 0;
var common_1 = require("@nestjs/common");
var PaymentController = /** @class */ (function () {
    function PaymentController(paymentService) {
        this.paymentService = paymentService;
    }
    PaymentController.prototype.getBankList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var banks, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.paymentService.getBankList()];
                    case 1:
                        banks = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: banks
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                message: 'Không thể lấy danh sách ngân hàng',
                                error: error_1.message
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PaymentController.prototype.createVnpayUrl = function (createPaymentDto) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentService.createVnpayPaymentUrl(createPaymentDto)];
                    case 1:
                        paymentUrl = _a.sent();
                        return [2 /*return*/, { paymentUrl: paymentUrl }];
                }
            });
        });
    };
    PaymentController.prototype.handleReturnUrl = function (vnpParams, res) {
        return __awaiter(this, void 0, void 0, function () {
            var isValidSignature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentService.verifyReturnUrl(vnpParams)];
                    case 1:
                        isValidSignature = _a.sent();
                        if (isValidSignature) {
                            // Xử lý khi thanh toán thành công
                            // Cập nhật trạng thái đơn hàng trong DB
                            res.render('success', { code: vnpParams['vnp_ResponseCode'] });
                        }
                        else {
                            res.render('error', { code: '97' });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PaymentController.prototype.queryTransaction = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentService.queryTransaction(body.orderId, body.transDate)];
                    case 1:
                        result = _a.sent();
                        res.json(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    PaymentController.prototype.refundTransaction = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentService.refundTransaction(body)];
                    case 1:
                        result = _a.sent();
                        res.json(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        common_1.Get('banks')
    ], PaymentController.prototype, "getBankList");
    __decorate([
        common_1.Post('create_vnpay_url'),
        __param(0, common_1.Body())
    ], PaymentController.prototype, "createVnpayUrl");
    __decorate([
        common_1.Get('vnpay_return'),
        __param(0, common_1.Query()), __param(1, common_1.Res())
    ], PaymentController.prototype, "handleReturnUrl");
    __decorate([
        common_1.Post('querydr'),
        __param(0, common_1.Body()), __param(1, common_1.Res())
    ], PaymentController.prototype, "queryTransaction");
    __decorate([
        common_1.Post('refund'),
        __param(0, common_1.Body()), __param(1, common_1.Res())
    ], PaymentController.prototype, "refundTransaction");
    PaymentController = __decorate([
        common_1.Controller('payment')
    ], PaymentController);
    return PaymentController;
}());
exports.PaymentController = PaymentController;
