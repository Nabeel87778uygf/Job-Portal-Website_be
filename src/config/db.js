import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }

    if (!process.env.MONGO_URI) {
        const errorMsg = "MONGO_URI environment variable is missing!";
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log("DB Connected:", conn.connection.host);
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        throw error;
    }
};