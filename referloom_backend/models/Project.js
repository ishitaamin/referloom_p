// src/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // URL to the uploaded cover image
  // Hidden by default as per your use cases!
  visibility: { type: String, enum: ["public", "private"], default: "private" },
  tags: [{ type: String }], // e.g., ["React Native", "AI", "MongoDB"]
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);