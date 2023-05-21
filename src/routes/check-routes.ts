import { Router } from "express";
import { Auth } from "../middlewares/auth";
import {
  createCheck,
  deleteCheck,
  getAllChecks,
  getCheck,
} from "../controllers/check.controller";

const router = Router();

router.post("/", Auth, createCheck);

router.get("/", Auth, getAllChecks);
router.get("/:id", Auth, getCheck);

// router.patch(":id");
// router.put("/:id");

router.delete("/:id", Auth, deleteCheck);

export { router as checkRoutes };
