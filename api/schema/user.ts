import {
  getModelForClass,
  index,
  prop,
  queryMethod,
  ReturnModelType,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { Field, InputType, ObjectType } from "type-graphql";

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User["email"]
) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@index({ email: 1 }, { unique: true })
@queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({})
  username: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => Boolean, {})
  @prop({ default: false })
  isOnline: boolean;

  @prop({ required: true })
  password: string;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class CreateUserInput
  implements Pick<User, "username" | "email" | "password">
{
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginUserInput implements Pick<User, "email" | "password"> {
  @Field()
  email: string;
  @Field()
  password: string;
}
