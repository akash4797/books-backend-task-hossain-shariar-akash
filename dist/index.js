"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express4_1 = require("@apollo/server/express4");
async function startServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    const server = new server_1.ApolloServer({
        typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
        resolvers: {
            Query: {
                hello: () => "Hello world!",
            },
        },
    });
    await server.start();
    app.use("/", (0, express4_1.expressMiddleware)(server, {
        context: async ({ req, res }) => ({ req, res }),
    }));
    app.listen(4000);
}
startServer();
