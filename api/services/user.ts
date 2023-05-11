import { CreateUserInput, LoginUserInput, UserModel } from "../schema/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "../types";
import { ApolloError } from "apollo-server-express";
import { PubSubEngine } from "type-graphql";

export class UserService {
  async register(data: CreateUserInput) {
    // * Check if user already exists
    const user = await UserModel.find().findByEmail(data.email);
    if (user) {
      throw new ApolloError("User already exists");
    }

    // * Hash for password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // * Create our user
    const newUser = await UserModel.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return newUser.toObject();
  }

  async login(data: LoginUserInput, context: Context) {
    // * Find user by email
    const user = await UserModel.find().findByEmail(data.email).lean();

    if (!user) {
      throw new ApolloError("User not found", "400");
    }

    // * Check if password is correct
    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) {
      throw new ApolloError("Invalid password", "400");
    }

    // * Generate jwt
    const token = jwt.sign(user, process.env.JWT_SECRET ?? "", {
      expiresIn: "1d",
    });

    // * Set a cookie for jwt
    context.res.cookie("accessToken", token, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      domain: "*",
      secure: process.env.NODE_ENV === "production",
    });

    return user;
  }

  async resetIsOnline(context: Context) {
    const _id = context.user._id;

    const user = await UserModel.findById(_id);

    if (!user) {
      throw new ApolloError("User not found", "400");
    }

    user.updateOne({ $set: { isOnline: false } });

    return user.toObject();
  }
}
