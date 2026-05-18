import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            minlength: 3,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ["admin", "employer", "jobseeker"],
            default: "jobseeker",
        },

        profile: {
            companyName: {
                type: String,
                default: "",
            },
            skills: {
                type: [String],
                default: [],
            },
            resume: {
                type: String, // URL ya file path
                default: "",
            },
        },
        phone: {
            type: String,
            default: "",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    },

    { timestamps: true }
);

export default mongoose.model("User", userSchema);