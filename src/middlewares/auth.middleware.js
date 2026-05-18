import jwt from "jsonwebtoken";

/* =========================
   PROTECT MIDDLEWARE (FIXED)
========================= */
export const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token found"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 SAFE FIX (IMPORTANT)
        req.user = {
            _id: decoded._id || decoded.id,
            role: decoded.role
        };

        // DEBUG (REMOVE LATER)
        console.log("AUTH USER:", req.user);

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

/* =========================
   ROLE BASED AUTH
========================= */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.user.role} not allowed`
            });
        }

        next();
    };
};

/* =========================
   ADMIN ONLY (FIXED STYLE)
========================= */
export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin only access"
        });
    }
    next();
};