import { Injectable } from '@nestjs/common';
import { predefinedQuestions } from './predefined-questions.config';
const { GoogleGenerativeAI } = require("@google/generative-ai");

@Injectable()
export class ChatService {
    private messages = [];
    private genAI;
    private model;

    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.API_AI_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    addMessage(message: string, sender: string) {
        const newMessage = { message, sender, timestamp: new Date() };
        this.messages.push(newMessage);
        return newMessage;
    }

    getMessages() {
        return this.messages;
    }

    async processMessage(message: string): Promise<{ answer: string; isAI: boolean }> {
        console.log('Processing message:', message);
        const lowercaseMessage = message.toLowerCase();
    
        for (const question of predefinedQuestions) {
            if (question.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
                console.log('Matched predefined question:', question);
                return { answer: question.answer, isAI: false };
            }
        }
    
        console.log('No match found, processing with AI');
        return this.processAIMessage(message);
    }

    async processAIMessage(message: string): Promise<{ answer: string; isAI: boolean }> {
        try {
            const result = await this.model.generateContent([message]);
            return { answer: result.response.text(), isAI: true };
        } catch (error) {
            console.error('Error processing AI message:', error);
            return { answer: 'Xin lỗi, có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.', isAI: false };
        }
    }
}