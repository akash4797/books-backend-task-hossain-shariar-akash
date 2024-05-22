import jwt from "jsonwebtoken";
import { Request } from "express";
export default async function verifyToken(req: Request) {
  const token = req.cookies["token"];

  if (!token) {
    throw new Error("Not authenticated");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET!);

  if (!payload) {
    throw new Error("Not authenticated");
  }

  return payload as { id: string; email: string; role: string };
}
