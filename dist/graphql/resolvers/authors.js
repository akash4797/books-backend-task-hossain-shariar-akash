"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../lib/db");
const apollo_server_express_1 = require("apollo-server-express");
const verifytoken_1 = __importDefault(require("../../context/verifytoken"));
exports.default = {
    Query: {
        getauthors: async (_, __, { req }) => {
            await (0, verifytoken_1.default)(req);
            return await db_1.prisma.author.findMany({
                include: {
                    books: true,
                },
            });
        },
        getauthor: async (_, { authorinput }, { req }) => {
            await (0, verifytoken_1.default)(req);
            const { id } = authorinput;
            return await db_1.prisma.author.findUnique({
                where: {
                    id: id,
                },
                include: {
                    books: true,
                },
            });
        },
    },
    Mutation: {
        addauthor: async (_, { authorinput, }, { req }) => {
            const user = await (0, verifytoken_1.default)(req);
            if (user && user.role !== "SPECIAL") {
                throw new apollo_server_express_1.AuthenticationError("Unauthorized");
            }
            const { name, email, bio, birthdate } = authorinput;
            return await db_1.prisma.author.create({
                data: {
                    name: name,
                    email: email,
                    bio: bio,
                    birthdate: birthdate,
                },
            });
        },
    },
};
