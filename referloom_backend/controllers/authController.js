// src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* REGISTER - simple for testing (hash password) */
export const register = async (req, res) => {
  try {
    // When using upload.fields, files are under req.files (object)
    // Non-file fields come in req.body (even with multipart/form-data)
    const {
      email,
      password: rawPassword,
      phone,
      role = "student",
      fullName,
      graduationYear,
      companyName,
      designation,
      enrollmentNo,
      semester,
      branch,
    } = req.body;

    // simple validation
    if (!email) return res.status(400).json({ message: "Email is required" });

    // check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // decide password: provided or default
    const password = rawPassword || "123456";

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email,
      phone,
      password: hashedPassword,
      role,
      fullName,
      createdAt: new Date(),
    };

    // files: req.files is an object when using upload.fields
    // e.g. req.files.degreeProof -> [{...}], req.files.idProof -> [{...}]
    const files = req.files || {};

    if (role === "alumni") {
      // require degree proof file
      const degreeArr = files.degreeProof || [];
      if (degreeArr.length === 0) {
        return res.status(400).json({ message: "Degree proof is required for alumni" });
      }
      userData.role = "alumni";
      userData.alumni = {
        fullName: fullName || "",
        graduationYear: graduationYear || "",
        degreeProof: degreeArr[0].filename,
      };
    } else if (role === "company") {
      const idArr = files.idProof || [];
      if (idArr.length === 0) {
        return res.status(400).json({ message: "Company ID proof is required" });
      }
      userData.role = "company";
      userData.company = {
        companyName: companyName || "",
        designation: designation || "",
        idProof: idArr[0].filename,
      };
    } else if (role === "student") {
      userData.role = "student";
      userData.student = {
        enrollmentNo: enrollmentNo || "",
        semester: semester || "",
        branch: branch || "",
      };
    }

    const user = await User.create(userData);

    // remove sensitive fields before sending
    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;

    return res.status(201).json({ message: "User registered", user: userObj });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    // include password explicitly because we set select:false
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const userObj = user.toObject();
    delete userObj.password;

    res.json({ token, user: userObj });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
