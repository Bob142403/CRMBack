import { Router } from "express";
import Clients from "./clients.controller.ts";
import { verifyToken } from "../middlewares/verifyToken.ts";

const router = Router();
const clients = new Clients();

router.post("/", verifyToken, clients.addClient);

router.delete("/:id", verifyToken, clients.deleteClient);

router.get("/", verifyToken, clients.getClients);
router.get("/:id", verifyToken, clients.getClientById);

router.put("/:id", verifyToken, clients.updateClient);

export default router;
