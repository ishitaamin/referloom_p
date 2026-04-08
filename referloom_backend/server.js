import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js"; 
import path from "path";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/otp", otpRoutes);
// AUTH ROUTES
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, () => console.log("Server running on port 5000"));
