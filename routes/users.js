import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import connection from "../db.js";
import jsonwebtoken from "jsonwebtoken";

const router = Router();

export const PRIVATE_KEY = "SHHHHH";

router.post("/", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (first_name && last_name && email && password) {
    try {
      connection
        .promise()
        .query(
          `INSERT INTO users (first_name, last_name, email, password) VALUE('${first_name}', '${last_name}', '${email}', '${password}')`
        );
      res.status(200).send({ msg: "Create User" });
    } catch (err) {
      console.log(err);
    }
  }
  res.status(200);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = jsonwebtoken.sign(req.body, PRIVATE_KEY);
    console.log(email, password);
    const user = await connection
      .promise()
      .query(
        `SELECT * FROM users WHERE email='${email}' and password='${password}'`
      );
    if (!user[0].length) {
      res.status(201).send({ msg: "User Not Found" });
    } else res.status(200).send({ msg: token });
  } else res.status(201).send({ msg: "User Not Found" });
});

router.get("/", verifyToken, async (req, res) => {
  const users = await connection.promise().query(`SELECT * FROM users`);
  res.send(users[0]);
});

router.get("/:id", verifyToken, async (req, res) => {
  const user = await connection
    .promise()
    .query(`SELECT * FROM users WHERE id='${req.params.id}'`);
  res.send(user[0][0]);
});
router.delete("/:id", verifyToken, async (req, res) => {
  await connection
    .promise()
    .query(`DELETE FROM users WHERE id='${req.params.id}'`);
  res.send({ msg: "success" });
});

router.put("/:id", verifyToken, async (req, res) => {
  const { first_name, last_name, email } = req.body;
  await connection
    .promise()
    .query(
      `UPDATE users SET first_name='${first_name}', last_name='${last_name}' , email='${email}' WHERE id='${req.params.id}'`
    );
  res.send({ msg: "Update success" });
});

export default router;
/**
 * Отдельная страница для логина
 * Страница для регистрации
 *  api /login body логин и пароль . ответе информация о пользователе либо 401
 *  jvt-токен
 */
