// src/models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  // postedBy can be an Alumni or a Company
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  companyName: { type: String, required: true }, // Extracted from User profile or manual input
  description: { type: String, required: true },
  requirements: [{ type: String }], // e.g., "Strong Python skills"
  jobType: { type: String, enum: ["Full-Time", "Internship", "Contract"], default: "Full-Time" },
  location: { type: String, default: "Remote" },
  salaryRange: { type: String }, // e.g., "₹12L - ₹18L"
  status: { type: String, enum: ["open", "closed"], default: "open" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);