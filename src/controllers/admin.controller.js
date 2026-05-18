import User from "../models/user.model.js";
import Job from "../models/jobModel.js";


export const adminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();

        const totalEmployers = await User.countDocuments({ role: "employer" });
        const totalJobSeekers = await User.countDocuments({ role: "jobseeker" });

        const recentUsers = await User.find()
            .select("-password")
            .sort({ createdAt: -1 })
            .limit(5);

        const recentJobs = await Job.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalJobs,
                totalEmployers,
                totalJobSeekers,
                recentUsers,
                recentJobs
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET ALL USERS

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// DELETE USER

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// GET ALL JOBS

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("createdBy", "fullName email");

        res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// APPROVE JOB

export const approveJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        job.status = "approved";
        await job.save();

        res.status(200).json({
            success: true,
            message: "Job approved successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// DELETE JOB

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        await job.deleteOne();

        res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};