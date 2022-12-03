import { ApolloError } from "apollo-server-express";
import { PubSubEngine } from "type-graphql";
import { CreateMessageInput, Message, MessagesByChat } from "../schema/message";
import { MessageModel } from "../schema/processing";
import { User, UserModel } from "../schema/user";
import { Context } from "../types";

export default class MessageService {
  async getMessages(input: MessagesByChat): Promise<Message[]> {
    const messages = await MessageModel.find({ chat: input.chat });

    return messages;
  }

  async createMassage(
    input: CreateMessageInput,
    pubSub: PubSubEngine,
    context: Context
  ): Promise<Message> {
    const { _id } = context.user;
    const user = await UserModel.findById(_id);

    if (!user) throw new ApolloError("User not found");
    const message = await MessageModel.create({
      ...input,
      userId: _id,
    });

    await Promise.all([
      pubSub.publish("MESSAGES", message.toObject()),
      user?.updateOne({ $set: { isOnline: true } }),
      pubSub.publish("IS_ONLINE", true),
    ]);
    return message;
  }
}
