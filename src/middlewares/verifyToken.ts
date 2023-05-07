import { PRIVATE_KEY } from "../users/users.route.js";
import jsonwebtoken from "jsonwebtoken";

export function verifyToken(req, res, next) {
  try {
    jsonwebtoken.verify(req.headers.authorization, PRIVATE_KEY);
    next();
  } catch (err) {
    res.status(400).json("Token is not verified");
  }
}
 