import { Ref, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { Chat } from "./chat";
import { User } from "./user";

@ObjectType()
export class Message {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ ref: () => User })
  userId: Ref<User>;

  @Field(() => User)
  user: User;

  @Field(() => String)
  @prop({ required: true })
  content: string;

  @Field(() => String)
  @prop({ ref: () => Chat })
  chat: Ref<Chat>;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

// * Get messages by chat id
@InputType()
export class MessagesByChat implements Pick<Message, "chat"> {
  @Field(() => String)
  chat: string;
}

// * Create message
@InputType()
export class CreateMessageInput
  implements
    Omit<Message, "_id" | "user" | "userId" | "createdAt" | "updatedAt">
{
  @Field(() => String)
  content: string;

  @Field(() => String)
  chat: string;
}
