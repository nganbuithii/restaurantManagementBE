// src/chat/chat.service.ts

import { Injectable } from '@nestjs/common';
import { predefinedQuestions } from './predefined-questions.config';

@Injectable()
export class ChatService {
    private messages = [];

    addMessage(message: string, sender: string) {
        const newMessage = { message, sender, timestamp: new Date() };
        this.messages.push(newMessage);
        return newMessage;
    }

    getMessages() {
        return this.messages;
    }

    processMessage(message: string): { answer: string; isAI: boolean } {
        console.log('Processing message:', message);
        const lowercaseMessage = message.toLowerCase();
    
        for (const question of predefinedQuestions) {
            if (question.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
                console.log('Matched predefined question:', question);
                return { answer: question.answer, isAI: false };
            }
        }
    
        console.log('No match found, processing with AI');
        return { answer: 'Xin lỗi, tôi không thể trả lời câu hỏi của bạn lúc này. Vui lòng thử lại sau.', isAI: false };
    }

    private processAIMessage(message: string): string {
        return `AI đang xử lý câu hỏi của bạn: "${message}". Vui lòng đợi trong giây lát.`;
    }
}
