import { PRIVATE_KEY } from "../users/users.route.ts";
import jsonwebtoken from "jsonwebtoken";
import { Request, Response, Express, NextFunction } from "express";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    next();
  } catch (err) {
    res.status(400).json("Token is not verified");
  }
}
