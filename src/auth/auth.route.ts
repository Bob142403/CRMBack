import { Router } from "express";
import Auth from "./auth.controller.ts";

const router = Router();
const auth = new Auth();

router.post("/", clients.addClient);

router.delete("/:id", clients.deleteClient);

router.get("/", clients.getClients);
router.get("/:id", clients.getClientById);

router.put("/:id", clients.updateClient);

export default router;
