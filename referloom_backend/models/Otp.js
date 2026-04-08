// src/models/Otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: true },
  expiresAt: { type: Date, required: true, index: true },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // optional if using TTL index

export default mongoose.model("Otp", otpSchema);
