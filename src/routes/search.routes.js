import express from "express";
import { searchJobs } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", searchJobs);

export default router;