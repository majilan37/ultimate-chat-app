import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../../generated/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { rawRequest } from "graphql-request";

type Variables = { email: string; password: string };
type Response = {
  login: User & { id: string };
};

const LOGIN_QUERY = /* GraphQL */ `
  mutation loginUser($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      _id
      email
      username
    }
  }
`;

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "Login",
        credentials: {
          username: { label: "Email", type: "email", placeholder: "Email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const { email, password } = credentials as Record<
            "email" | "password",
            string
          >;

          const { data, headers } = await rawRequest<Response, Variables>(
            process.env.NEXT_PUBLIC_GRAPHQL_URI || "",
            LOGIN_QUERY,
            {
              email,
              password,
            }
          );

          // * Set cookies received from our Graph QL Backend
          res.setHeader("Set-Cookie", headers.get("set-cookie") as string);

          if (data) {
            return {
              ...data.login,
              name: data.login.username,
              id: data.login._id,
            };
          } else {
            console.log("Failed to fetch");
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    callbacks: {
      async jwt({ token, user }) {
        return {
          ...token,
          email: token.email,
          ...(user && { id: user.id }),
        };
      },

      async session({ session, token, user }) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.sub = token.sub as string;
        session.user.id = token.id as string;

        return session;
      },
    },
  });
