import authors from "./authors";
import books from "./books";

export default {
  Author: {
    createdAt: () => new Date().toISOString(),
  },
  Book: {
    createdAt: () => new Date().toISOString(),
  },
  Query: {
    ...authors.Query,
    ...books.Query,
  },
  Mutation: {
    ...authors.Mutation,
    ...books.Mutation,
  },
};
