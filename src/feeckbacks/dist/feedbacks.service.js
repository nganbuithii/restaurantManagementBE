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
exports.FeeckbacksService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var FeeckbacksService = /** @class */ (function () {
    function FeeckbacksService(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    FeeckbacksService.prototype.create = function (createFeedbackDto, user) {
        return __awaiter(this, void 0, Promise, function () {
            var content, rating, isActive, label, feedback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = createFeedbackDto.content, rating = createFeedbackDto.rating, isActive = createFeedbackDto.isActive;
                        return [4 /*yield*/, this.classifyText(content)];
                    case 1:
                        label = _a.sent();
                        console.log("LABEL CỦA FEED BACK", label);
                        return [4 /*yield*/, this.prisma.feedback.create({
                                data: {
                                    content: content,
                                    rating: rating !== null && rating !== void 0 ? rating : 5,
                                    isActive: isActive !== null && isActive !== void 0 ? isActive : true,
                                    userId: user.sub,
                                    label: label
                                }
                            })];
                    case 2:
                        feedback = _a.sent();
                        return [2 /*return*/, feedback];
                }
            });
        });
    };
    FeeckbacksService.prototype.getAll = function (filter) {
        return __awaiter(this, void 0, Promise, function () {
            var items_per_page, page, search, skip, take, where, _a, feedbacks, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        items_per_page = Number(process.env.ITEMS_PER_PAGE);
                        page = Number(filter.page) || 1;
                        search = filter.search || "";
                        skip = (page - 1) * items_per_page;
                        take = items_per_page;
                        where = search
                            ? {
                                content: {
                                    contains: search
                                }
                            }
                            : {};
                        return [4 /*yield*/, Promise.all([
                                this.prisma.feedback.findMany({
                                    where: where,
                                    skip: skip,
                                    take: items_per_page,
                                    orderBy: {
                                        id: 'desc'
                                    },
                                    include: {
                                        user: {
                                            select: {
                                                fullName: true,
                                                avatar: true,
                                                username: true
                                            }
                                        }
                                    }
                                }),
                                this.prisma.feedback.count({ where: where }),
                            ])];
                    case 1:
                        _a = _b.sent(), feedbacks = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                data: feedbacks,
                                total: total,
                                currentPage: page,
                                itemsPerPage: items_per_page
                            }];
                }
            });
        });
    };
    FeeckbacksService.prototype.getDetail = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var feedback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.feedback.findUnique({
                            where: { id: id },
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        fullName: true,
                                        avatar: true
                                    }
                                },
                                replies: {
                                    include: {
                                        user: {
                                            select: {
                                                id: true,
                                                fullName: true,
                                                avatar: true
                                            }
                                        },
                                        replies: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        feedback = _a.sent();
                        if (!feedback) {
                            throw new common_1.NotFoundException("Feedback with ID " + id + " not found");
                        }
                        return [2 /*return*/, feedback];
                }
            });
        });
    };
    FeeckbacksService.prototype.update = function (id, updateFeedbackDto) {
        return __awaiter(this, void 0, Promise, function () {
            var feedback, updatedFeedback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.feedback.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        feedback = _a.sent();
                        if (!feedback) {
                            throw new common_1.NotFoundException("Feedback with id " + id + " not found");
                        }
                        return [4 /*yield*/, this.prisma.feedback.update({
                                where: { id: id },
                                data: __assign(__assign({}, updateFeedbackDto), { updatedAt: new Date() })
                            })];
                    case 2:
                        updatedFeedback = _a.sent();
                        return [2 /*return*/, updatedFeedback];
                }
            });
        });
    };
    FeeckbacksService.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, Promise, function () {
            var feedback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.feedback.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        feedback = _a.sent();
                        if (!feedback) {
                            throw new common_1.NotFoundException("Feedback with id " + id + " not found");
                        }
                        if (feedback.userId !== user.sub) {
                            throw new common_1.ForbiddenException('You are not allowed to delete this feedback');
                        }
                        return [4 /*yield*/, this.prisma.feedback.update({
                                where: { id: id },
                                data: {
                                    isActive: false,
                                    updatedAt: new Date()
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FeeckbacksService.prototype.replyToFeedback = function (id, replyDto, user) {
        return __awaiter(this, void 0, Promise, function () {
            var parentFeedback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.feedback.findUnique({
                            where: { id: id }
                        })];
                    case 1:
                        parentFeedback = _a.sent();
                        if (!parentFeedback) {
                            throw new common_1.NotFoundException("Feedback with ID " + id + " not found");
                        }
                        return [2 /*return*/, this.prisma.feedback.create({
                                data: {
                                    content: replyDto.content,
                                    userId: user.sub,
                                    parentId: id
                                }
                            })];
                }
            });
        });
    };
    FeeckbacksService.prototype.classifyText = function (text) {
        return __awaiter(this, void 0, Promise, function () {
            var apiUrl, apiToken, response, scoredLabels, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = this.configService.get('CLASSIFICATION_API_URL');
                        apiToken = this.configService.get('CLASSIFICATION_API_TOKEN');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].post(apiUrl, { text: text }, {
                                headers: {
                                    'Authorization': "Token " + apiToken,
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        scoredLabels = response.data.scored_labels;
                        if (scoredLabels && scoredLabels.length > 0) {
                            return [2 /*return*/, scoredLabels[0].label];
                        }
                        throw new Error('No label returned from classification API');
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error classifying text:', error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FeeckbacksService = __decorate([
        common_1.Injectable()
    ], FeeckbacksService);
    return FeeckbacksService;
}());
exports.FeeckbacksService = FeeckbacksService;
