import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            default: "Remote",
        },

        jobType: {
            type: String,
            enum: ["full-time", "part-time", "internship"],
            default: "full-time",
        },

        salary: {
            type: String,
            default: "Not Disclosed",
        },

        // ⭐ REQUIRED FIELD
        category: {
            type: String,
            required: true,
            trim: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        applicants: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                fullName: String,
                email: String,
                appliedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;