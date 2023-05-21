import { Router } from "express";
import { Auth } from "../middlewares/auth";
import { createCheck, getCheck } from "../controllers/check.controller";

const router = Router();

router.post("/", Auth, createCheck);

// router.get("/");
router.get("/:id", Auth, getCheck);

// router.patch(":id");
// router.put("/:id");

// router.delete("/:id");

export { router as checkRoutes };
