// referloom_backend/models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fitScore: { type: Number, required: true },
  // ✅ FIXED ENUM TO MATCH OUR ATS PIPELINE:
  status: { 
    type: String, 
    enum: ['applied', 'interviewing', 'offered', 'accepted', 'rejected'], 
    default: 'applied' 
  },
  isReferral: { type: Boolean, default: false },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Application", applicationSchema);