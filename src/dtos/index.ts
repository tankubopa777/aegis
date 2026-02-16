import { z } from "zod";

export const CreateConversationDto = z.object({
    title: z.string().min(1).optional(),
});

export const SendMessageDto = z.object({
    content: z.string().min(1, "Message content is required"),
});

export const UpdateConversationDto = z.object({
    title: z.string().min(1, "Title is required"),
});

export const PaginationDto = z.object({
    offset: z.coerce.number().int().min(0).default(0),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});