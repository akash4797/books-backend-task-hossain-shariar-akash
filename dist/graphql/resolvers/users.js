"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../lib/db");
const argon2 = __importStar(require("argon2"));
const apollo_server_express_1 = require("apollo-server-express");
const isEmail_js_1 = __importDefault(require("validator/lib/isEmail.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    Query: {
        login: async (_, { logininput, }, { res }) => {
            const { email, password } = logininput;
            const user = await db_1.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError("User does not exist");
            }
            const validPassword = await argon2.verify(user.password, password);
            if (!validPassword) {
                throw new apollo_server_express_1.AuthenticationError("Wrong password");
            }
            const payload = {
                id: user.id,
                email: user.email,
                role: user.role,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "none",
                maxAge: 1000 * 60 * 60 * 24,
                secure: process.env.NODE_ENV === "production",
            });
            return user;
        },
    },
    Mutation: {
        register: async (_, { registerinput, }) => {
            const { name, email, password, role } = registerinput;
            if (!(0, isEmail_js_1.default)(email)) {
                throw new apollo_server_express_1.UserInputError("Invalid email");
            }
            if (password !== registerinput.confirmpassword) {
                throw new apollo_server_express_1.UserInputError("Passwords don't match");
            }
            const hashedPassword = await argon2.hash(password);
            const user = await db_1.prisma.user.create({
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
