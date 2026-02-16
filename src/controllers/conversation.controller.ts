import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ConversationService } from "../services/conversation.service";
import {
    CreateConversationDto,
    SendMessageDto,
    UpdateConversationDto,
    PaginationDto,
} from "../dtos/index";
import type { ApiResponse } from "../types";

const router = new Hono();
const service = new ConversationService();

// GET /v1/conversations
router.get("/", zValidator("query", PaginationDto), async (c) => {
    const { offset, limit } = c.req.valid("query");
    const { data, total } = await service.list(offset, limit);

    return c.json<ApiResponse>({
        success: true,
        data,
        meta: { total, offset, limit },
    });
});

// POST /v1/conversations
router.post("/", zValidator("json", CreateConversationDto), async (c) => {
    const { title } = c.req.valid("json");
    const conversation = await service.create(title);

    return c.json<ApiResponse>({ success: true, data: conversation }, 201);
});

// POST /v1/conversations/:id/messages
router.post("/:id/messages", zValidator("json", SendMessageDto), async (c) => {
    const id = c.req.param("id");
    const { content } = c.req.valid("json");
    const result = await service.sendMessage(id, content);

    return c.json<ApiResponse>({ success: true, data: result }, 201);
});

// PATCH /v1/conversations/:id
router.patch("/:id", zValidator("json", UpdateConversationDto), async (c) => {
    const id = c.req.param("id");
    const { title } = c.req.valid("json");
    const updated = await service.rename(id, title);

    return c.json<ApiResponse>({ success: true, data: updated });
});

export { router as conversationController };