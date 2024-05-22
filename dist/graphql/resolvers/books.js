"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../lib/db");
const verifytoken_1 = __importDefault(require("../../context/verifytoken"));
const apollo_server_express_1 = require("apollo-server-express");
exports.default = {
    Query: {
        getbooks: async (_, __, { req }) => {
            await (0, verifytoken_1.default)(req);
            return await db_1.prisma.book.findMany({
                include: {
                    author: true,
                },
            });
        },
        getbook: async (_, { bookinput }, { req }) => {
            await (0, verifytoken_1.default)(req);
            const { id } = bookinput;
            return await db_1.prisma.book.findUnique({
                where: {
                    id: id,
                },
                include: {
                    author: true,
                },
            });
        },
    },
    Mutation: {
        addbook: async (_, { bookinput, }, { req }) => {
            const user = await (0, verifytoken_1.default)(req);
            if (user && user.role !== "SPECIAL") {
                throw new apollo_server_express_1.AuthenticationError("Unauthorized");
            }
            const { isbn, title, subtitle, description, website, authorid, genre, publisher, published, } = bookinput;
            return await db_1.prisma.book.create({
                data: {
                    isbn: isbn,
                    title: title,
                    subtitle: subtitle,
                    descirption: description,
                    website: website,
                    author: {
                        connect: {
                            id: authorid,
                        },
                    },
                    genre: genre,
                    publisher: publisher,
                    published: published,
                },
            });
        },
    },
};
