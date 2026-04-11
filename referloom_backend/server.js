import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js"; 
import projectRoutes from "./routes/projectRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
// ✨ NEW IMPORTS
import userRoutes from "./routes/userRoutes.js";
import mentorshipRoutes from "./routes/mentorshipRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/jobs", jobRoutes);
// ✨ NEW MOUNTS
app.use("/api/users", userRoutes);
app.use("/api/mentorship", mentorshipRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Referloom API is running...");
});

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));