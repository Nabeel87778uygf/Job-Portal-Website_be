import bcrypt from "bcryptjs";
import * as authService from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";
import { validateRegister } from "../utils/validators.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const error = validateRegister(req.body);
        if (error) return res.status(400).json({ message: error });

        const { fullName, email, password, role, profile } = req.body;

        const existingUser = await authService.findUserByEmail(email).select("+password");
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }



        // //  Role-based validation (IMPORTANT PART)
        // if (role === "employer" && !profile?.companyName) {
        //     return res.status(400).json({
        //         message: "Company name is required for employer"
        //     });
        // }

        // if (
        //     role === "jobseeker" &&
        //     (!profile?.skills || profile.skills.length === 0 || !profile?.resume)
        // ) {
        //     return res.status(400).json({
        //         message: "Skills and resume are required for jobseeker"
        //     });
        // }


        //  Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await authService.createUser({
            fullName,
            email,
            password: hashedPassword,
            role,
            profile: profile || {}
        });

        const token = generateToken(user._id, user.role);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                fullName: user.fullName,
            },
        });
    } catch (error) {
        next(error);
    }
};



//login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await authService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = generateToken(user._id, user.role);


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,    //development me false, production me true,
            // secure: true,  //production me true karna hai,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                fullName: user.fullName,
            },
        });
    } catch (error) {
        next(error);
    }
};