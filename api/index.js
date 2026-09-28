import dotenv from "dotenv";
dotenv.config();

import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

export default async function handler(req, res) {
    try {
        await connectDB();
    } catch (error) {
        console.error("Vercel DB Connection Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Database connection failed. Check MONGO_URI in Vercel environment variables.",
            error: error.message,
        });
    }
    return app(req, res);
}

