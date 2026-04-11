import express from "express";
import { createProject, getUserProjects ,getProjectById} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", createProject);
router.get("/user/:userId", getUserProjects);
router.get("/:id", getProjectById);
export default router;