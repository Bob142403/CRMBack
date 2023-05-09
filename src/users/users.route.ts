import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.ts";
import Users from "./users.controller.ts";

const router = Router();
const users = new Users();

export const PRIVATE_KEY = "SHHHHH";

router.post("/", users.addUser);

router.post("/login", users.login);

router.delete("/:id", verifyToken, users.deleteUser);

router.put("/:id", verifyToken, users.updateUser);

router.get("/", verifyToken, users.getUsers);

router.get("/:id", verifyToken, users.getUserById);

export default router;
/**
 * Отдельная страница для логина
 * Страница для регистрации
 *  api /login body логин и пароль . ответе информация о пользователе либо 401
 *  jvt-токен
 * 400 404
 */
