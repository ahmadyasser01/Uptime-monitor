import { Router } from "express";
import { Auth } from "../middlewares/auth";
import {
  createCheck,
  deleteCheck,
  getAllChecks,
  getCheck,
  updateCheck,
} from "../controllers/check.controller";

const router = Router();

router.post("/", Auth, createCheck);

router.get("/", Auth, getAllChecks);
router.get("/:id", Auth, getCheck);

router.patch(":id", Auth, updateCheck);
router.put("/:id", Auth, updateCheck);

router.delete("/:id", Auth, deleteCheck);

export { router as checkRoutes };
