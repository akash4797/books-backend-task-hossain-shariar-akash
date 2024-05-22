import authors from "./authors";
import books from "./books";
import users from "./users";

export default {
  Author: {
    createdAt: () => new Date().toISOString(),
  },
  Book: {
    createdAt: () => new Date().toISOString(),
  },
  User: {
    createdAt: () => new Date().toISOString(),
  },
  Query: {
    ...authors.Query,
    ...books.Query,
    ...users.Query,
  },
  Mutation: {
    ...authors.Mutation,
    ...books.Mutation,
    ...users.Mutation,
  },
};
