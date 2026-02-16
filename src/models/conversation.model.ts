import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
    {
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const ConversationSchema = new Schema(
    {
        title: { type: String, default: "New Conversation" },
        messages: { type: [MessageSchema], default: [] },
    },
    { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", ConversationSchema);