import { prisma } from "../../lib/db";

export default {
  Query: {
    getbooks: async () => {
      return await prisma.book.findMany({
        include: {
          author: true,
        },
      });
    },

    getbook: async (_: any, { bookinput }: { bookinput: { id: string } }) => {
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
      }
    ) => {
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
