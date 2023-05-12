import connection from "../services/db.ts";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { PRIVATE_KEY } from "../users/users.route.ts";

interface qwe {
  affectedRows: number;
}

class Auth {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password) {
      const token = jsonwebtoken.sign(req.body, PRIVATE_KEY);
      const qwe = await connection
        .promise()
        .query(
          `SELECT * FROM users WHERE email='${email}' and password='${password}'`
        );
      const user = qwe[0] as Object[];
      if (!user.length) {
        res.status(404).json("NETY -_-");
      } else res.status(200).json({ msg: token });
    } else res.status(404).json("Incorrect Data!");
  }
  async signUp(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body;
    if (first_name && last_name && email && password) {
      try {
        await connection
          .promise()
          .query(
            `INSERT INTO users (first_name, last_name, email, password) VALUE('${first_name}', '${last_name}', '${email}', '${password}')`
          );
        res.status(200).json({ msg: "Create User" });
      } catch (err) {
        res.status(400);
      }
    } else res.status(400);
  }
}

export default Auth;
