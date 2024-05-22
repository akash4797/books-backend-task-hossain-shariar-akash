"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../lib/db");
exports.default = {
    Query: {
        getbooks: async () => {
            return await db_1.prisma.book.findMany({
                include: {
                    author: true,
                },
            });
        },
        getbook: async (_, { bookinput }) => {
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
        addbook: async (_, { bookinput, }) => {
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
