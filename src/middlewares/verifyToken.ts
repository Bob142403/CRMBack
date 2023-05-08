import { PRIVATE_KEY } from "../users/users.route.js";
import jsonwebtoken from "jsonwebtoken";
import { Request, Response, Express } from "express";

export function verifyToken(req: Request, res: Response, next) {
  try {
    jsonwebtoken.verify(req.headers.authorization, PRIVATE_KEY);
    next();
  } catch (err) {
    res.status(400).json("Token is not verified");
  }
}
