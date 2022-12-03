import { getModelForClass } from "@typegoose/typegoose";
import { Chat } from "./chat";
import { Message } from "./message";

export const MessageModel = getModelForClass(Message, {
  schemaOptions: {
    timestamps: true,
  },
});
export const ChatModel = getModelForClass(Chat);
