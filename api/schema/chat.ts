import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./user";
import { Message } from "./message";

@ObjectType()
export class Chat {
  @Field(() => String)
  _id: string;

  @Field(() => [String])
  @prop({ ref: () => User, type: () => String })
  users: Ref<User, string>[];

  @Field(() => [User], { nullable: "items" })
  users_details: User[];

  @Field(() => [Message], { nullable: "items" })
  messages: Message[];
}

@InputType()
export class CreateChatInput implements Pick<Chat, "users"> {
  @Field(() => [String])
  users: string[];
}

@InputType()
export class GetChatInput implements Pick<Chat, "_id"> {
  @Field(() => String)
  _id: string;
}
