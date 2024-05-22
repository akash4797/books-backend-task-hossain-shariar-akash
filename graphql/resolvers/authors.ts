import { prisma } from "../../lib/db";
import { UserInputError, AuthenticationError } from "apollo-server-express";

export default {
  Query: {
    getauthors: async () => {
      return await prisma.author.findMany({
        include: {
          books: true,
        },
      });
    },
    getauthor: async (
      _: any,
      { authorinput }: { authorinput: { id: string } }
    ) => {
      const { id } = authorinput;
      return await prisma.author.findUnique({
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
    addauthor: async (
      _: any,
      {
        authorinput,
      }: {
        authorinput: {
          name: string;
          email: string;
          bio: string;
          birthdate: string;
        };
      }
    ) => {
      const { name, email, bio, birthdate } = authorinput;
      return await prisma.author.create({
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
