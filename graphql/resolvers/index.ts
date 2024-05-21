import authors from "./authors";

export default {
  Author: {
    createdAt: () => new Date().toISOString(),
  },
  Query: {
    ...authors.Query,
  },
  Mutation: {
    ...authors.Mutation,
  },
};
