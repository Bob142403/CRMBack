import { Router } from "express";
import ClientsController from "./clients.controller.ts";
import { verifyToken } from "../middlewares/verify-token.ts";

const router = Router();
const clients = new ClientsController();

router.post("/", verifyToken, clients.addClient);

router.delete("/:id", verifyToken, clients.deleteClient);

router.get("/", verifyToken, clients.getClients);
router.get("/:id", verifyToken, clients.getClientById);

router.put("/:id", verifyToken, clients.updateClient);

export default router;
