import { Router } from "express";
import { login, signup, verify } from "../controllers/user.controller";
import { signupValidator } from "../validation/user.validation";
import { validationMiddleware } from "../middlewares/validate";

const router = Router();

router.post("/signup", validationMiddleware(signupValidator), signup);

router.post("/login", validationMiddleware(signupValidator), login);

router.patch("/verify", verify);

export { router as userRouter };
