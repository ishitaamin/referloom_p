import express from "express";
import { createJob, getJobMatches, getJobById, applyToJob, getMyApplicants } from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", createJob);
router.get("/matches", getJobMatches);

// ✅ ADD THIS LINE (Must be above /:id)
router.get("/my-applicants", getMyApplicants); 

router.get("/:id", getJobById);
router.post("/:id/apply", applyToJob);

export default router;