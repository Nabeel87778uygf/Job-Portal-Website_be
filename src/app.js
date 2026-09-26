import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { getCities } from "./controllers/job.controller.js";

import searchRoutes from "./routes/search.routes.js";

const app = express();

// Security middleware
app.use(helmet());

// Logging  
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// CORS (important for frontend)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:3000",
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps, curl, or server-to-server)
            if (!origin) return callback(null, true);
            if (
                allowedOrigins.includes(origin) ||
                origin.endsWith(".vercel.app")
            ) {
                return callback(null, true);
            }
            return callback(null, true); // Permissive CORS for deployed Vercel apps
        },
        credentials: true,
    })
);


//auth Routes
app.use("/api/auth", authRoutes);

//job Routes
app.use("/api/jobs", jobRoutes);

//admin Routes
app.use("/api/admin", adminRoutes);

//user Routes
app.use("/api/user", userRoutes);

//search Routes
app.use("/api/search", searchRoutes);

//get cities Routes
app.use("/api/cities", getCities);




// Default route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Error handler (always last)
app.use(errorHandler);

export default app;