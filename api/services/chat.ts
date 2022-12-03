import { ApolloError } from "apollo-server-core";
import { Chat, CreateChatInput, GetChatInput } from "../schema/chat";
import { Context } from "../types";
import { Publisher } from "type-graphql";
import { ChatModel } from "../schema/processing";
export default class ChatService {
  async getChats(context: Context) {
    const email = context.user.email;
    const chats = await ChatModel.find({ users: { $in: [email] } });

    return chats;
  }

  async createChat(input: CreateChatInput, publish: Publisher<Chat>) {
    const chat = await ChatModel.findOne(input);

    if (chat) {
      throw new ApolloError("Chat already exists", "400");
    }
    const newChat = await ChatModel.create(input);
    await publish(newChat.toObject());
    return newChat.toObject();
  }

  async getChat(input: GetChatInput): Promise<Chat | null> {
    const chat = await ChatModel.findOne({ _id: input._id });

    if (!chat) {
      throw new ApolloError("No Chat found with that " + input._id, "400");
    }

    return chat;
  }
}
