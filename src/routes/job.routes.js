import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

import {
   createJob,
   getJobs,
   applyJob,
   getAppliedJobs,
   getCities,
   getLatestJobs,
   getJobById,
   getMyJobs,
   searchJobs
} from "../controllers/job.controller.js";

const router = express.Router();

/* PUBLIC ROUTES */

// latest jobs
router.get("/latest", getLatestJobs);

// cities
router.get("/cities", getCities);

//  SEARCH (IMPORTANT - MUST BE ABOVE :id)
router.get("/search", searchJobs);


/* EMPLOYER ROUTES */

// my jobs
router.get("/my-jobs", protect, authorize("employer"), getMyJobs);

// create job
router.post("/", protect, authorize("employer", "admin"), createJob);


/* JOBSEEKER ROUTES */

// apply job
router.post("/:id/apply", protect, authorize("jobseeker"), applyJob);

// applied jobs
router.get("/applied", protect, authorize("jobseeker"), getAppliedJobs);


/* COMMON ROUTES */

// all jobs
router.get("/", protect, authorize("jobseeker", "admin", "employer"), getJobs);

//  SINGLE JOB (ALWAYS LAST)
router.get("/:id", protect, getJobById);

export default router;