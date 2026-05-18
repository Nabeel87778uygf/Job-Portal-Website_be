import Job from "../models/jobModel.js";

export const searchJobs = async (req, res) => {
    try {
        const { keyword, location, page = 1, limit = 6 } = req.query;

        let filter = {
            status: "approved"
        };


        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { company: { $regex: keyword, $options: "i" } }
            ];
        }


        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }


        const skip = (Number(page) - 1) * Number(limit);


        const jobs = await Job.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));


        const total = await Job.countDocuments(filter);

        res.status(200).json({
            success: true,
            jobs,
            totalJobs: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};