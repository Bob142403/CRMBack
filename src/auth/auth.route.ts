import { Router } from "express";
import Auth from "./auth.controller.ts";

const router = Router();
const auth = new Auth();

router.post("/login", auth.signIn);

router.post("/sign-up", auth.signUp);

export default router;
