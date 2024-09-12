"use strict";
// src/chat/chat.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatService = void 0;
var common_1 = require("@nestjs/common");
var predefined_questions_config_1 = require("./predefined-questions.config");
var ChatService = /** @class */ (function () {
    function ChatService() {
        this.messages = [];
    }
    ChatService.prototype.addMessage = function (message, sender) {
        var newMessage = { message: message, sender: sender, timestamp: new Date() };
        this.messages.push(newMessage);
        return newMessage;
    };
    ChatService.prototype.getMessages = function () {
        return this.messages;
    };
    ChatService.prototype.processMessage = function (message) {
        console.log('Processing message:', message);
        var lowercaseMessage = message.toLowerCase();
        for (var _i = 0, predefinedQuestions_1 = predefined_questions_config_1.predefinedQuestions; _i < predefinedQuestions_1.length; _i++) {
            var question = predefinedQuestions_1[_i];
            if (question.keywords.some(function (keyword) { return lowercaseMessage.includes(keyword); })) {
                console.log('Matched predefined question:', question);
                return { answer: question.answer, isAI: false };
            }
        }
        console.log('No match found, processing with AI');
        return { answer: 'Xin lỗi, tôi không thể trả lời câu hỏi của bạn lúc này. Vui lòng thử lại sau.', isAI: false };
    };
    ChatService.prototype.processAIMessage = function (message) {
        return "AI \u0111ang x\u1EED l\u00FD c\u00E2u h\u1ECFi c\u1EE7a b\u1EA1n: \"" + message + "\". Vui l\u00F2ng \u0111\u1EE3i trong gi\u00E2y l\u00E1t.";
    };
    ChatService = __decorate([
        common_1.Injectable()
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
