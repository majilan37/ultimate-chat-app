import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import { Context } from "./types";
import jwt from "jsonwebtoken";
import { User } from "./schema/user";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

(async function () {
  //   * App config
  const app = express();
  const PORT = process.env.PORT || 5000;

  // * Middleware
  app.use(cookieParser());
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

  //   * Building schema
  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/*.{ts,js}"],
    authChecker: ({ context: { req } }: { context: Context }): boolean => {
      return !!req?.cookies?.accessToken;
    },
  });

  // * Apollo Server
  const server = new ApolloServer({
    schema,
    subscriptions: {
      path: "/api/__graphql",
      onConnect: () => console.log("Subscription Connected"),
    },
    context: (ctx: Context) => {
      if (ctx.req?.cookies?.accessToken) {
        const user = jwt.verify(
          ctx.req.cookies.accessToken,
          process.env.JWT_SECRET || ""
        ) as User;
        ctx.user = user;
      }
      ctx?.res?.set("Access-Control-Allow-Origin", ["http://localhost:3000"]);

      return ctx;
    },
  });

  // * Start Server
  await server.start();

  // * Apply middleware
  server.applyMiddleware({ app, path: "/api/__graphql" });

  // * WS Server
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // * DB config
  mongoose.connect(process.env.MONGO_DB_URI || "", () =>
    console.log("Connected to Mongo DB")
  );

  // * Listener
  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
