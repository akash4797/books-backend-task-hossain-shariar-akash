"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function verifyToken(req) {
    const token = req.cookies["token"];
    if (!token) {
        throw new Error("Not authenticated");
    }
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!payload) {
        throw new Error("Not authenticated");
    }
    return payload;
}
exports.default = verifyToken;
