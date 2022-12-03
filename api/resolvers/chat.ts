import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  ResolverInterface,
  Root,
  Subscription,
} from "type-graphql";
import { Chat, CreateChatInput, GetChatInput } from "../schema/chat";
import { Message } from "../schema/message";
import { MessageModel } from "../schema/processing";
import { User, UserModel } from "../schema/user";
import ChatService from "../services/chat";
import { Context } from "../types";

@Resolver(() => Chat)
export default class ChatResolver implements ResolverInterface<Chat> {
  constructor(private readonly chatService: ChatService) {
    this.chatService = new ChatService();
  }

  @Authorized()
  @Query(() => [Chat])
  async getChats(@Ctx() context: Context) {
    return this.chatService.getChats(context);
  }

  @Authorized()
  @Query(() => Chat)
  async getChat(@Arg("input") input: GetChatInput) {
    return this.chatService.getChat(input);
  }

  @Authorized()
  @Mutation(() => Chat)
  async createChat(
    @Arg("input") input: CreateChatInput,
    @PubSub("NEW_CHAT") publish: Publisher<Chat>
  ) {
    return this.chatService.createChat(input, publish);
  }

  @Subscription({
    topics: "NEW_CHAT",
  })
  newChat(@Root() payload: Chat): Chat {
    return payload;
  }

  @FieldResolver({ nullable: true })
  async users_details(@Root() chat: Chat): Promise<User[]> {
    const user__1 = (await UserModel.find().findByEmail(
      // @ts-ignore
      (chat.users && chat.users[0]) ?? (chat._doc.users[0] as string)
    )) as User;
    const user__2 = (await UserModel.find().findByEmail(
      // @ts-ignore
      (chat.users && chat.users[1]) ?? (chat._doc.users[1] as string)
    )) as User;

    return [user__1, user__2];
  }

  @FieldResolver({ nullable: true })
  async messages(@Root() chat: Chat): Promise<Message[]> {
    console.log(chat);
    const messages = await MessageModel.find({
      chat: chat._id ?? (chat as any)._doc._id,
    });

    return messages;
  }
}
