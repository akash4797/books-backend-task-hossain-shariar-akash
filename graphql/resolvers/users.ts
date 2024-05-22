import { prisma } from "../../lib/db";
import { Response } from "express";
import * as argon2 from "argon2";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import isEmail from "validator/lib/isEmail.js";
import jwt from "jsonwebtoken";

export default {
  Query: {
    login: async (
      _: any,
      {
        logininput,
      }: {
        logininput: { email: string; password: string };
      },
      { res }: { res: Response }
    ) => {
      const { email, password } = logininput;
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new AuthenticationError("User does not exist");
      }

      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword) {
        throw new AuthenticationError("Wrong password");
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
        secure: true,
      });

      return user;
    },
  },
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
