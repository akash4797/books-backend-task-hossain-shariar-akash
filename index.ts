import express, { Express } from "express";
import { ApolloServer } from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./graphql/resolvers";
import typedefs from "./graphql/typedefs";
import cookieParser from "cookie-parser";

async function startServer() {
  const app: Express = express();
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());
  const server = new ApolloServer({
    typeDefs: typedefs,
    resolvers: resolvers,
  });
  await server.start();
  app.use(
    "/",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
  app.listen(4000);
}

startServer();
