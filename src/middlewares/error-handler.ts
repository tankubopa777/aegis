import type { ErrorHandler } from "hono";
import { AppError } from "../errors/app-error";

export const errorHandler: ErrorHandler = (err, c) => {
    if (err instanceof AppError) {
        return c.json({ success: false, error: err.message }, err.statusCode as any);
    }

    console.error("Unhandled error:", err);
    return c.json({ success: false, error: "Internal Server Error" }, 500);
};