// referloom_backend/models/User.js
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["student", "alumni", "company", "admin"], required: true },
  fullName: { type: String, required: true },
  
  // 🔐 PRIVACY & VISIBILITY ENGINE
  visibilityMode: { type: String, enum: ["public", "private"], default: "private" }, // Default private for privacy-first approach
  grantedAccess: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 

  
  // 🎓 ADVANCED PROFILE
  isVerified: { type: Boolean, default: false }, 
  headline: { type: String, default: "" },
  bio: { type: String, default: "" },
  skills: [{ type: String }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  // --- STUDENT SPECIFIC FIELDS ---
  studentDetails: {
    course: String,
    semester: Number,
    university: { type: String, default: 'Navrachana University' },
    skills: [String],
    // ✅ ADD THIS NEW ARRAY
    experience: [{
      company: String,
      role: String,
      duration: String,
      description: String
    }]
  },

  
  
  // ROLE SPECIFIC DATA
  student: {
    course: String,
    semester: String,
    university: { type: String, default: "Default University" }
  },
  alumni: {
    graduationYear: String,
    company: String,
    role: String, // E.g., SDE II, Product Manager
    degreeProof: String,
  },
  company: {
    companyName: String,
    hrContact: String,
    industryType: String,
    idProof: String,
  },
  
  createdAt: { type: Date, default: Date.now },
});



export default mongoose.model("User", userSchema);