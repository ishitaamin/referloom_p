// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phone: String,
  role: { type: String, enum: ["student","alumni","company","faculty"], default: "student" },
  fullName: String,
  alumni: {
    fullName: String,
    graduationYear: String,
    degreeProof: String, // filename
  },
  company: {
    companyName: String,
    designation: String,
    idProof: String,
  },
  student: {
    enrollmentNo: String,
    semester: String,
    branch: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
