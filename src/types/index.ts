export interface IMessage {
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
}

export interface IConversation {
    _id: string;
    title: string;
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IAIService {
    generateReply(userMessage: string): string | Promise<string>;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    meta?: {
        total: number;
        offset: number;
        limit: number;
    };
}