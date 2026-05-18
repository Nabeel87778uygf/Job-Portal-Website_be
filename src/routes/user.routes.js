import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

import {
    getAppliedJobs
} from "../controllers/job.controller.js";

const router = express.Router();


router.get("/applied-jobs", protect, getAppliedJobs);
export default router;