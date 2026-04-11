// referloom_backend/controllers/projectController.js
import Project from "../models/Project.js";
import User from "../models/User.js";

// @desc    Upload a new project
// @route   POST /api/projects
// @access  Private (Students only)
export const createProject = async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: "Only students can upload projects." });
    }

    const { title, description, tags, githubUrl, demoUrl } = req.body;

    // Create the project
    const project = await Project.create({
      studentId: req.user.id,
      title,
      description,
      tags,
      githubUrl,
      demoUrl
    });

    // Link project to the User's profile (CRITICAL for the AI engine to see it)
    await User.findByIdAndUpdate(req.user.id, {
      $push: { projects: project._id } // Assumes you added `projects` array to User schema as discussed
    });

    res.status(201).json({ message: "Project uploaded successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all projects for a specific user
// @route   GET /api/projects/user/:userId
// referloom_backend/controllers/userController.js

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('student', 'fullName email');
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json(project);
  } catch (error) {
    console.error("❌ Error fetching project:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// @access  Private
export const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ studentId: req.params.userId }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};