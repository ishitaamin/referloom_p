// src/models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // 🤖 Smart Matching Engine
  fitScore: { type: Number, default: 0 }, // Calculates how well student skills match job requirements
  
  status: { type: String, enum: ["pending", "shortlisted", "rejected", "hired"], default: "pending" },
  
  // 🔥 The Alumni Referral System
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // ID of the Alumni who referred them
  referralStatus: { type: String, enum: ["none", "Recommended", "Highly Recommended"], default: "none" },
  
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", applicationSchema);