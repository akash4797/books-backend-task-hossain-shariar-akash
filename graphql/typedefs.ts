export default /* GraphQL */ `
  type User {
    name: String!
    email: String!
    password: String!
    createdAt: String
  }
  type Book {
    isbn: String!
    title: String!
    subtitle: String
    descirption: String
    website: String
    publisher: String!
    published: String!
    author: Author!
    genre: [String!]
    createdAt: String
  }
  type Author {
    name: String!
    email: String!
    bio: String
    birthdate: String
  }

  input BookInput {
    isbn: String!
    title: String!
    subtitle: String
    descirption: String
    website: String
    publisher: String!
    published: String!
    author: String!
    genre: [String!]
  }

  input AuthorInput {
    name: String!
    email: String!
    bio: String
    birthdate: String
  }

  input BookGetInput {
    id: String!
  }

  input AuthorGetInput {
    id: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
    confirmpassword: String!
  }

  type Query {
    getbooks: [Book]!
    getonebook(bookinput: BookGetInput): Book!
    getauthors: [Author]!
    getoneauthor(authorinput: AuthorGetInput): Author!
    login(logininput: LoginInput): User!
  }

  type Mutation {
    addbook(bookinput: BookInput): Book!
    addauthor(authorinput: AuthorInput): Author!
    register(registerinput: RegisterInput): User!
  }
`;
