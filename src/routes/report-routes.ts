import { Router } from "express";
import { Auth } from "../middlewares/auth";
import { getReport } from "../controllers/report.controller";

const router = Router({ mergeParams: true });

router.get("/", getReport);

export { router as ReportRouter };
