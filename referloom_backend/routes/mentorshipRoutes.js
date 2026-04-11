// referloom_backend/routes/mentorshipRoutes.js
import express from "express";
import { 
  requestMentorship, 
  getMyRequests, // Changed from getMentorshipRequests
  respondToRequest 
} from "../controllers/mentorshipController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/request", requestMentorship);
router.get("/requests", getMyRequests); // Changed from getMentorshipRequests
router.put("/requests/:id", respondToRequest);

export default router;