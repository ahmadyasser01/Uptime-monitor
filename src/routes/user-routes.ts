import { Router } from "express";
import { login, signup, verify } from "../controllers/user.controller";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.patch("verify", verify);
