import { Conversation } from "../models/conversation.model";
import type { IMessage } from "../types";

export class ConversationRepository {
    async findAll(offset: number, limit: number) {
        const [data, total] = await Promise.all([
            Conversation.find().sort({ updatedAt: -1 }).skip(offset).limit(limit).lean(),
            Conversation.countDocuments(),
        ]);
        return { data, total };
    }

    async findById(id: string) {
        return Conversation.findById(id).lean();
    }

    async create(title?: string) {
        return Conversation.create({ title });
    }

    async updateTitle(id: string, title: string) {
        return Conversation.findByIdAndUpdate(id, { title }, { new: true }).lean();
    }

    async pushMessages(id: string, messages: IMessage[]) {
        return Conversation.findByIdAndUpdate(
            id,
            { $push: { messages: { $each: messages } } },
            { new: true }
        ).lean();
    }
}