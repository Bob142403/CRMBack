import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.ts";
import UsersController from "./users.controller.ts";

const router = Router();
const users = new UsersController();

export const PRIVATE_KEY = "SHHHHH";

router.post("/", verifyToken, users.addUser);

router.delete("/:id", verifyToken, users.deleteUser);

router.put("/:id", verifyToken, users.updateUser);

router.get("/", verifyToken, users.getUsers);

router.get("/:id", verifyToken, users.getUserById);

export default router;
