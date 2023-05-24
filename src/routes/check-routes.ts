import { Router } from "express";
import { Auth } from "../middlewares/auth";
import {
  createCheck,
  deleteCheck,
  getAllChecks,
  getCheck,
  updateCheck,
} from "../controllers/check.controller";
import { validationMiddleware } from "../middlewares/validate";
import {
  createCheckValidator,
  updateCheckValidator,
} from "../validation/check.validation";

const router = Router();

router.post("/", Auth, validationMiddleware(createCheckValidator), createCheck);

router.get("/", Auth, getAllChecks);
router.get("/:id", Auth, getCheck);

router.patch(
  ":id",
  Auth,
  validationMiddleware(updateCheckValidator),
  updateCheck
);
router.put(
  "/:id",
  Auth,
  validationMiddleware(createCheckValidator),
  updateCheck
);

router.delete("/:id", Auth, deleteCheck);

export { router as checkRoutes };
