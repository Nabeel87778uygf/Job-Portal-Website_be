import express from "express";
import {
    adminDashboard,
    getAllUsers,
    deleteUser,
    getAllJobs,
    approveJob,
    deleteJob
} from "../controllers/admin.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();


router.get("/dashboard", protect, isAdmin, adminDashboard);
router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/user/:id", protect, isAdmin, deleteUser);
router.get("/jobs", protect, isAdmin, getAllJobs);
router.patch("/job/:id/approve", protect, isAdmin, approveJob);
router.delete("/job/:id", protect, isAdmin, deleteJob);

export default router;