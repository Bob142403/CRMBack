import connection from "../../db.js";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { PRIVATE_KEY } from "./users.route.js";

class Users {
  async addUser(req: Request, res: Response) {
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
  async deleteUser(req: Request, res: Response) {
    const qwe = await connection
      .promise()
      .query(`DELETE FROM users WHERE id='${req.params.id}'`); /// Обработка ошибок
    if (qwe[0].affectedRows) res.status(200).json("Success");
    else res.status(400).json("Incorrect Id!");
  }
  async updateUser(req: Request, res: Response) {
    const { first_name, last_name, email } = req.body;
    const qwe = await connection
      .promise()
      .query(
        `UPDATE users SET first_name='${first_name}', last_name='${last_name}' , email='${email}' WHERE id='${req.params.id}'`
      );
    if (qwe[0].affectedRows) res.status(200).json("Success");
    else res.status(400).json("Incorrect Id!");
  }
  async getUserById(req: Request, res: Response) {
    const user = await connection
      .promise()
      .query(`SELECT * FROM users WHERE id='${req.params.id}'`);
    if (user[0].length) res.status(200).json(user[0][0]); /// SELECT TOP
    else res.status(400).json("Incorrect Id!");
  }
  async getUsers(req: Request, res: Response) {
    const users = await connection.promise().query(`SELECT * FROM users`);
    res.status(200).json(users[0]);
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password) {
      const token = jsonwebtoken.sign(req.body, PRIVATE_KEY);
      const user = await connection
        .promise()
        .query(
          `SELECT * FROM users WHERE email='${email}' and password='${password}'`
        );
      if (!user[0].length) {
        res.status(404).json("NETY -_-");
      } else res.status(200).json({ msg: token });
    } else res.status(404).json("Incorrect Data!");
  }
}

export default Users;
