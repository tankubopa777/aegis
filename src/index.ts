import { Hono } from "hono";
import { logger } from "hono/logger";
import { connectDB } from "./config/database";
import { conversationController } from "./controllers/conversation.controller";
import { errorHandler } from "./middlewares/error-handler";

const app = new Hono();

// Middleware
app.use("*", logger());
app.onError(errorHandler);

// Routes
app.route("/v1/conversations", conversationController);

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

// Start
const port = Number(process.env.PORT) || 3000;

connectDB().then(() => {
    console.log(`A.E.G.I.S running on port ${port}`);
});

export default {
    port,
    fetch: app.fetch,
};