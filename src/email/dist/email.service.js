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
exports.EmailService = void 0;
// email.service.ts
var common_1 = require("@nestjs/common");
var nodemailer = require("nodemailer");
var EmailService = /** @class */ (function () {
    function EmailService() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PASS
            }
        });
    }
    EmailService.prototype.sendOTP = function (to, otp) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transporter.sendMail({
                            from: '"Nabity Restaurant" <noreply@nabity.com>',
                            to: to,
                            subject: 'Password Reset OTP - Nabity Restaurant ',
                            // text: `Your OTP for password reset is: ${otp}. It will expire in 3 minutes.`,
                            html: "<html><p>Your OTP for password reset is : <strong>" + otp + "</strong>. It will expire in 3 minutes.</p></html>"
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailService.prototype.sendReservationConfirmation = function (to, reservationDetails) {
        return __awaiter(this, void 0, Promise, function () {
            var date, time, tableId, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = reservationDetails.date, time = reservationDetails.time, tableId = reservationDetails.tableId, status = reservationDetails.status;
                        return [4 /*yield*/, this.transporter.sendMail({
                                from: '"Nabity Restaurant" <noreply@nabity.com>',
                                to: to,
                                subject: 'Reservation Confirmation - Nabity Restaurant',
                                html: "\n        <html>\n          <p>Dear Guest,</p>\n          <p>Your reservation has been confirmed!</p>\n          <p><strong>Date:</strong> " + date + "</p>\n          <p><strong>Time:</strong> " + time + "</p>\n          <p><strong>Table ID:</strong> " + tableId + "</p>\n          <p><strong>Status:</strong> " + status + "</p>\n          <p>Thank you for choosing Nabity Restaurant. We look forward to serving you.</p>\n          <p>Best Regards,</p>\n          <p>Nabity Restaurant Team</p>\n        </html>\n      "
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailService.prototype.sendEmail = function (to, subject, content) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transporter.sendMail({
                            from: '"Nabity Restaurant" <noreply@nabity.com>',
                            to: '2151050271ngan@ou.edu.vn',
                            subject: subject,
                            html: content
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailService = __decorate([
        common_1.Injectable()
    ], EmailService);
    return EmailService;
}());
exports.EmailService = EmailService;
