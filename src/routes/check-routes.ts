import { Router } from "express";
import { Auth } from "../middlewares/auth";
import { createCheck } from "../controllers/check.controller";

const router = Router();

router.post("/", Auth, createCheck);

// router.get("/");
// router.get("/:id");

// router.patch(":id");
// router.put("/:id");

// router.delete("/:id");

export { router as checkRoutes };
