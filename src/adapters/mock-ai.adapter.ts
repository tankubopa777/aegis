import type { IAIService } from "../types";

export class MockAIAdapter implements IAIService {
    generateReply(userMessage: string): string {
        const replies = [
            `You said: "${userMessage}" — that's interesting!`,
            `I'm just a mock AI, but here's my take on "${userMessage}".`,
            `Echo: ${userMessage.split("").reverse().join("")}`,
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }
}
