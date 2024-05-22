import { prisma } from "../../lib/db";
import { Request } from "express";
import verifyToken from "../../context/verifytoken";
import { UserInputError, AuthenticationError } from "apollo-server-express";

export default {
  Query: {
    getbooks: async (_: any, __: any, { req }: { req: Request }) => {
      await verifyToken(req);
      return await prisma.book.findMany({
        include: {
          author: true,
        },
      });
    },

    getbook: async (
      _: any,
      { bookinput }: { bookinput: { id: string } },
      { req }: { req: Request }
    ) => {
      await verifyToken(req);
      const { id } = bookinput;
      return await prisma.book.findUnique({
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
    addbook: async (
      _: any,
      {
        bookinput,
      }: {
        bookinput: {
          isbn: string;
          title: string;
          subtitle: string;
          description: string;
          website: string;
          authorid: string;
          genre: string[];
          publisher: string;
          published: string;
        };
      },
      { req }: { req: Request }
    ) => {
      const user = await verifyToken(req);
      if (user && user.role !== "SPECIAL") {
        throw new AuthenticationError("Unauthorized");
      }
      const {
        isbn,
        title,
        subtitle,
        description,
        website,
        authorid,
        genre,
        publisher,
        published,
      } = bookinput;
      return await prisma.book.create({
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
