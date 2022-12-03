import mongoose from "mongoose";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Message, CreateMessageInput, MessagesByChat } from "../schema/message";
import { UserModel } from "../schema/user";
import MessageService from "../services/message";
import { Context } from "../types";

@Resolver(() => Message)
export default class MessageResolver {
  constructor(private readonly messageService: MessageService) {
    this.messageService = new MessageService();
  }

  @Query(() => [Message])
  getMessages(@Arg("input") input: MessagesByChat) {
    return this.messageService.getMessages(input);
  }

  @Authorized()
  @Mutation(() => Message)
  createMessage(
    @Arg("input") input: CreateMessageInput,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() context: Context
  ) {
    return this.messageService.createMassage(input, pubSub, context);
  }

  @FieldResolver()
  async user(@Root() message: Message) {
    const user = await UserModel.findById(
      message.userId ?? (message as any)._doc.userId
    );
    return user;
  }

  @Subscription({
    topics: "MESSAGES",
  })
  newMessage(@Root() payload: Message): Message {
    return payload;
  }
}
