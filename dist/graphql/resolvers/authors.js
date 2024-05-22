"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../lib/db");
exports.default = {
    Query: {
        getauthors: async () => {
            return await db_1.prisma.author.findMany();
        },
        getauthor: async (_, { authorinput }) => {
            const { id } = authorinput;
            return await db_1.prisma.author.findUnique({
                where: {
                    id: id,
                },
            });
        },
    },
    Mutation: {
        addauthor: async (_, { authorinput, }) => {
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
