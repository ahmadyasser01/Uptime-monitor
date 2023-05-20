import { Router } from "express";

const router = Router();

router.post("/checks");

router.get("/checks");
router.get("/checks/:id");

router.patch("/checks/:id");
router.put("/checks/:id");

router.delete("/checks/:id");

export { router as checkRoutes };
