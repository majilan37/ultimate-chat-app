import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Subscription,
} from "type-graphql";
import { CreateUserInput, LoginUserInput, User } from "../schema/user";
import { UserService } from "../services/user";
import { Context } from "../types";

@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService();
  }

  @Query(() => [User])
  async getUsers() {
    return [];
  }

  @Mutation(() => User)
  async register(@Arg("data") data: CreateUserInput) {
    return this.userService.register(data);
  }

  @Mutation(() => User)
  async login(@Arg("data") data: LoginUserInput, @Ctx() context: Context) {
    return this.userService.login(data, context);
  }

  @Mutation(() => User)
  async resetIsOnline(@Ctx() context: Context) {
    return this.userService.resetIsOnline(context);
  }
}
