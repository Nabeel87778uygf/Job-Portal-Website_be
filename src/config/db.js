import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("DB Connected:", conn.connection.host);
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        if (process.env.NODE_ENV !== "production") {
            process.exit(1);
        }
    }
};