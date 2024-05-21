"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authors_1 = __importDefault(require("./authors"));
exports.default = {
    Author: {
        createdAt: () => new Date().toISOString(),
    },
    Query: {
        ...authors_1.default.Query,
    },
    Mutation: {
        ...authors_1.default.Mutation,
    },
};
