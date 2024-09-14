import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) { }

    @Get()
    getMessages() {
        return this.chatService.getMessages();
    }

    @Post()
    async sendMessage(@Body() body: { message: string }) {
        console.log('Received message:', body.message);
        const { answer, isAI } = await this.chatService.processMessage(body.message);
        console.log('Processed answer:', answer, 'isAI:', isAI);
        const userMessage = this.chatService.addMessage(body.message, 'user');
        const botMessage = this.chatService.addMessage(answer, isAI ? 'ai' : 'support');
        return { userMessage, botMessage, isAI }; 
    }
}