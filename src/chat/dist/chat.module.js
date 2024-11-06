"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatModule = void 0;
var common_1 = require("@nestjs/common");
var chat_controller_1 = require("./chat.controller");
var chat_service_1 = require("./chat.service");
var prisma_service_1 = require("src/prisma.service");
var menu_item_service_1 = require("src/menu-item/menu-item.service");
var cloudinary_service_1 = require("src/cloudinary/cloudinary.service");
var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule = __decorate([
        common_1.Module({
            controllers: [chat_controller_1.ChatController],
            providers: [chat_service_1.ChatService, prisma_service_1.PrismaService, menu_item_service_1.MenuItemService, cloudinary_service_1.CloudinaryService]
        })
    ], ChatModule);
    return ChatModule;
}());
exports.ChatModule = ChatModule;
