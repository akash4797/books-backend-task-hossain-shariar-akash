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
    addauthor: async (_: any, { name, email, bio, birthdate }: any) => {
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
