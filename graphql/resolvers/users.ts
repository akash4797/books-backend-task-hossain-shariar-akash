import { prisma } from "../../lib/db";
import { Response } from "express";
import * as argon2 from "argon2";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import isEmail from "validator/lib/isEmail.js";
import jwt from "jsonwebtoken";

export default {
  Query: {},
  Mutation: {
    register: async (
      _: any,
      {
        registerinput,
      }: {
        registerinput: {
          name: string;
          email: string;
          password: string;
          confirmpassword: string;
          role: "NORMAL" | "SPECIAL";
        };
      }
    ) => {
      const { name, email, password, role } = registerinput;
      if (!isEmail(email)) {
        throw new UserInputError("Invalid email");
      }

      if (password !== registerinput.confirmpassword) {
        throw new UserInputError("Passwords don't match");
      }
      const hashedPassword = await argon2.hash(password);
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role: role,
        },
      });
      return user;
    },
  },
};
