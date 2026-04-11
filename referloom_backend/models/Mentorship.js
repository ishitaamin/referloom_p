// src/models/Mentorship.js
import mongoose from "mongoose";

const mentorshipSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  alumni: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  message: { type: String, required: true }, // "Why do you want to connect?"
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  
  requestedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Mentorship", mentorshipSchema);