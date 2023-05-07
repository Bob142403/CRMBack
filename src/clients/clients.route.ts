import { Router } from "express";
import Clients from "./clients.controller.js";

const router = Router();
const clients = new Clients();

router.post("/", clients.addClient);

router.delete("/:id", clients.deleteClient);

router.get("/", clients.getClients);
router.get("/:id", clients.getClientById);

router.put("/:id", clients.updateClient);

export default router;
