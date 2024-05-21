import { prisma } from "../../lib/db";
import { UserInputError, AuthenticationError } from "apollo-server-express";

export default {
  Query: {
    getauthors: async () => {
      return await prisma.author.findMany();
    },
    getauthor: async (_: any, { id }: { id: string }) => {
      return await prisma.author.findUnique({
        where: {
          id: id,
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
