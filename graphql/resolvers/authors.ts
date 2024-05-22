import { prisma } from "../../lib/db";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { Request } from "express";
import verifyToken from "../../context/verifytoken";

export default {
  Query: {
    getauthors: async (_: any, __: any, { req }: { req: Request }) => {
      await verifyToken(req);

      return await prisma.author.findMany({
        include: {
          books: true,
        },
      });
    },
    getauthor: async (
      _: any,
      { authorinput }: { authorinput: { id: string } },
      { req }: { req: Request }
    ) => {
      await verifyToken(req);

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
      },
      { req }: { req: Request }
    ) => {
      const user = await verifyToken(req);
      if (user && user.role !== "SPECIAL") {
        throw new AuthenticationError("Unauthorized");
      }
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
