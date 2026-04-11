// referloom_backend/routes/userRoutes.js
import express from "express";
import { 
  getMyProfile, 
  getUserById, 
  updateVisibility, 
  grantAccess,
  revokeAccess,
  updateProfile // ✅ Imported the new controller
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes here are protected (must be logged in)
router.use(protect);

router.get("/profile", getMyProfile);
router.put("/profile", updateProfile); // ✅ Added the PUT route for editing profile/skills
router.put("/visibility", updateVisibility);
router.post("/grant-access", grantAccess);
router.post("/revoke-access", revokeAccess);

// This must go last so it doesn't accidentally catch 'profile' or 'visibility' as an ID
router.get("/:id", getUserById); 

export default router;