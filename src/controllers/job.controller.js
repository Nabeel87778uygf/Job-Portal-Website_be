import Job from "../models/jobModel.js";

/* =========================
   CREATE JOB (FIXED)
========================= */
export const createJob = async (req, res) => {
    console.log("REQ BODY:", req.body);
    try {
        const {
            title,
            company,
            description,
            location,
            jobType,
            salary,
            category
        } = req.body;

        // ⭐ DEBUG (optional)
        console.log("CREATE JOB BODY:", req.body);

        const job = await Job.create({
            title,
            company,
            description,
            location: location || "Remote",
            jobType: jobType || "full-time",
            salary: salary || "Not Disclosed",

            // ⭐ IMPORTANT
            category,

            createdBy: req.user._id,
            status: "pending",
            applicants: []
        });

        res.status(201).json({
            success: true,
            job
        });

    } catch (error) {
        console.log("CREATE JOB ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* GET APPROVED JOBS */
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: "approved" })
            .populate("createdBy", "fullName email");

        res.json({
            success: true,
            jobs
        });

    } catch (error) {
        console.log("GET JOBS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* APPLY JOB */
export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user._id;

        const { fullName, email } = req.body;

        if (!fullName || !email) {
            return res.status(400).json({
                success: false,
                message: "Full name and email are required"
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        // ensure applicants array exists
        if (!Array.isArray(job.applicants)) {
            job.applicants = [];
        }

        // duplicate check
        const alreadyApplied = job.applicants.some(
            (a) => a.userId?.toString() === userId.toString()
        );

        if (alreadyApplied) {
            return res.status(400).json({
                success: false,
                message: "You already applied for this job"
            });
        }

        // push applicant
        job.applicants.push({
            userId,
            fullName,
            email,
            appliedAt: new Date()
        });

        await job.save();

        res.status(200).json({
            success: true,
            message: "Applied successfully"
        });

    } catch (error) {
        console.log("APPLY JOB ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* GET APPLIED JOBS */
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user._id;

        const jobs = await Job.find({
            "applicants.userId": userId
        });

        res.json({
            success: true,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* GET CITIES */
export const getCities = async (req, res) => {
    try {
        const cities = await Job.distinct("location");

        res.status(200).json({
            success: true,
            cities: ["All Locations", ...cities]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* GET LATEST JOBS */
export const getLatestJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: "approved" })
            .sort({ createdAt: -1 })
            .limit(6);

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* GET JOB BY ID */
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("createdBy", "fullName email");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* GET MY JOBS */
export const getMyJobs = async (req, res) => {
    try {
        const userId = req.user._id;

        const jobs = await Job.find({ createdBy: userId });

        res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



/* SEARCH JOBS */
export const searchJobs = async (req, res) => {
    try {

        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const category = req.query.category || "";

        const filter = {
            status: "approved"
        };

        // keyword filter
        if (keyword) {
            filter.title = {
                $regex: keyword,
                $options: "i",
            };
        }

        // location filter
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i",
            };
        }

        // category filter
        if (category) {
            filter.category = {
                $regex: category,
                $options: "i",
            };
        }

        const jobs = await Job.find(filter);

        res.status(200).json({
            success: true,
            jobs,
        });

    } catch (error) {

        console.log("SEARCH JOBS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};