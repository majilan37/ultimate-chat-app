import { JWT } from "next-auth/jwt";
import { DefaultSession, Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      accessToken?: string | unknown;
      refreshToken?: string | unknown;
      id?: string;
      sub?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    username: string;
    accessToken?: string | unknown;
    refreshToken?: string | unknown;
    id: string;
  }
}

declare module "next-auth" {
  interface User {
    username: string;
    id: string;
  }
}
