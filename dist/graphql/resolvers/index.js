"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authors_1 = __importDefault(require("./authors"));
const books_1 = __importDefault(require("./books"));
exports.default = {
    Author: {
        createdAt: () => new Date().toISOString(),
    },
    Book: {
        createdAt: () => new Date().toISOString(),
    },
    Query: {
        ...authors_1.default.Query,
        ...books_1.default.Query,
    },
    Mutation: {
        ...authors_1.default.Mutation,
        ...books_1.default.Mutation,
    },
};
