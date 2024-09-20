"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.NotificationService = void 0;
var common_1 = require("@nestjs/common");
var admin = require("firebase-admin");
var NotificationService = /** @class */ (function () {
    function NotificationService() {
    }
    NotificationService.prototype.sendAndSaveNotification = function (title, body, topic) {
        return __awaiter(this, void 0, void 0, function () {
            var message, notificationRef, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = {
                            notification: { title: title, body: body },
                            topic: topic
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, admin.firestore().collection('notifications').add({
                                title: title,
                                body: body,
                                topic: topic,
                                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                                readBy: {}
                            })];
                    case 2:
                        notificationRef = _a.sent();
                        return [4 /*yield*/, admin.messaging().send(message)];
                    case 3:
                        response = _a.sent();
                        console.log('Successfully sent message:', response);
                        return [2 /*return*/, {
                                savedNotification: { id: notificationRef.id, title: title, body: body, topic: topic },
                                firebaseResponse: response
                            }];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error sending or saving notification:', error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.getNotifications = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var snapshot, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, admin.firestore().collection('notifications')
                                .orderBy('createdAt', 'desc')
                                .get()];
                    case 1:
                        snapshot = _a.sent();
                        return [2 /*return*/, snapshot.docs.map(function (doc) {
                                var data = doc.data();
                                return __assign(__assign({ id: doc.id }, data), { isRead: data.readBy && data.readBy[user.sub] ? true : false });
                            })];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error getting notifications:', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.getUnreadNotificationsCount = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var snapshot, unreadCount, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, admin.firestore().collection('notifications').get()];
                    case 1:
                        snapshot = _a.sent();
                        unreadCount = snapshot.docs.filter(function (doc) {
                            var data = doc.data();
                            return !data.readBy || !data.readBy[user.sub];
                        }).length;
                        return [2 /*return*/, unreadCount];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error getting unread notifications count:', error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.markNotificationAsRead = function (notificationId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var notificationRef, error_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        notificationRef = admin.firestore().collection('notifications').doc(notificationId);
                        return [4 /*yield*/, notificationRef.update((_a = {},
                                _a["readBy." + user.sub] = true,
                                _a))];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.error('Error marking notification as read:', error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService = __decorate([
        common_1.Injectable()
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
