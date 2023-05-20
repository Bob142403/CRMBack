import { PRIVATE_KEY } from "../users/users.route.ts";
import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;
    jsonwebtoken.verify(token || "", PRIVATE_KEY);
    next();
  } catch (err) {
    res.status(400).json("Token is not verified");
  }
}
