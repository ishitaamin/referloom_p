// referloom_backend/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};



export const register = async (req, res) => {
  try {
    const { email, password, role, fullName, ...roleSpecificData } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    // 3. Create user
    const userData = {
      email,
      password: hashedPassword,
      role,
      fullName,
      isVerified: true, // Already verified via OTP step
    };

    // ✅ Map to studentDetails to match the Mongoose Schema
    if (role === "student") {
      userData.studentDetails = {
        course: roleSpecificData.course,
        semester: roleSpecificData.semester,
        university: roleSpecificData.university,
      };
    }

    // ✅ Map to professionalDetails to match the Mongoose Schema
    if (role === "alumni") {
      userData.professionalDetails = {
        companyName: roleSpecificData.company,
        designation: roleSpecificData.jobRole,
        experienceYears: roleSpecificData.graduationYear // Or map accordingly
      };
    }

    if (role === "company") {
      userData.company = {
        companyName: roleSpecificData.companyName,
        industryType: roleSpecificData.industryType,
      };
    }

    const user = await User.create(userData);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        unverifiedEmail: user.email
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};