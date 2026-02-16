import { AppError } from "../errors/app-error";
import { ConversationRepository } from "../repositories/conversation.repository";
import { MockAIService } from "./mock-ai.service";
import type { IMessage } from "../types";

export class ConversationService {
    constructor(
        private repo = new ConversationRepository(),
        private ai = new MockAIService()
    ) { }

    async list(offset: number, limit: number) {
        return this.repo.findAll(offset, limit);
    }

    async create(title?: string) {
        return this.repo.create(title);
    }

    async sendMessage(conversationId: string, content: string) {
        const conversation = await this.repo.findById(conversationId);
        if (!conversation) throw new AppError(404, "Conversation not found");

        const userMsg: IMessage = { role: "user", content, createdAt: new Date() };
        const aiReply: IMessage = {
            role: "assistant",
            content: this.ai.generateReply(content),
            createdAt: new Date(),
        };

        const updated = await this.repo.pushMessages(conversationId, [userMsg, aiReply]);
        return { conversation: updated, aiMessage: aiReply };
    }

    async rename(id: string, title: string) {
        const updated = await this.repo.updateTitle(id, title);
        if (!updated) throw new AppError(404, "Conversation not found");
        return updated;
    }
}