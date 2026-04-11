// referloom_backend/controllers/jobController.js
import Job from "../models/Job.js";
import User from "../models/User.js";
import { calculateFitScore } from "../utils/aiEngine.js";

// @desc    Create a Job Posting
// @route   POST /api/jobs
// @access  Private (Alumni or Company)
export const createJob = async (req, res) => {
  try {
    if (!['alumni', 'company'].includes(req.user.role)) {
      return res.status(403).json({ message: "Only companies and alumni can post jobs." });
    }

    const { title, company, location, type, description, requiredSkills } = req.body;

    const job = await Job.create({
      creatorId: req.user.id,
      title,
      company,
      location,
      type,
      description,
      requiredSkills
    });

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get Job Matches for Logged In Student (Powers JobMatchScreen)
// @route   GET /api/jobs/matches
// @access  Private (Students)
export const getJobMatches = async (req, res) => {
  try {
    // 1. Fetch all jobs
    const jobs = await Job.find().sort({ createdAt: -1 }).lean();
    
    // 2. Fetch the student with their projects populated
    const student = await User.findById(req.user.id).populate('projects');

    if (student.role !== 'student') {
        return res.status(403).json({ message: "Only students have a match feed." });
    }

    // 3. Process Fit Scores
    const matchedJobs = jobs.map(job => {
      const { fitScore } = calculateFitScore(student, job);
      return {
        ...job,
        fitScore // Attach the dynamic score
      };
    });

    // 4. Sort by highest fit score
    matchedJobs.sort((a, b) => b.fitScore - a.fitScore);

    res.json(matchedJobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get Single Job Detail with AI Feedback (Powers JobDetailScreen)
// @route   GET /api/jobs/:id
// @access  Private
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).lean();
    if (!job) return res.status(404).json({ message: "Job not found" });

    // If the viewer is a student, attach their specific AI feedback
    if (req.user.role === 'student') {
      const student = await User.findById(req.user.id).populate('projects');
      const aiData = calculateFitScore(student, job);
      
      job.fitScore = aiData.fitScore;
      job.aiSuggestions = aiData.aiSuggestions;
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Apply to a Job
// @route   POST /api/jobs/:id/apply
// @access  Private (Student)
export const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const student = await User.findById(req.user.id).populate('projects');

    // Prevent double apply
    const alreadyApplied = job.applicants.find(a => a.studentId.toString() === student._id.toString());
    if (alreadyApplied) return res.status(400).json({ message: "You have already applied." });

    // Lock in their fit score at the time of application
    const { fitScore } = calculateFitScore(student, job);

    job.applicants.push({
      studentId: student._id,
      fitScore: fitScore,
      status: 'pending'
    });

    await job.save();

    // 🔥 THE PROFILE UNLOCK ENGINE (Rule 9 from your spec)
    // When a student applies, the creator of the job (Recruiter) gets automatic full access!
    if (!student.grantedAccess.includes(job.creatorId)) {
        student.grantedAccess.push(job.creatorId);
        await student.save();
    }

    res.json({ message: "Application submitted successfully! The recruiter now has access to your full portfolio." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all applicants for jobs posted by the Alumni/Company
// @route   GET /api/jobs/my-applicants
// @access  Private (Alumni/Company)
export const getMyApplicants = async (req, res) => {
  try {
    // 1. Find all jobs posted by this user
    const jobs = await Job.find({ creatorId: req.user.id })
      .populate('applicants.studentId', 'fullName headline skills') // Bring in student details
      .lean();

    // 2. Flatten the applicants into a single array
    let allApplicants = [];
    jobs.forEach(job => {
      job.applicants.forEach(app => {
         if (app.studentId) {
           allApplicants.push({
             ...app,
             jobId: job._id,
             jobTitle: job.title,
             student: app.studentId
           });
         }
      });
    });

    // 3. Sort by Fit Score (Highest first)
    allApplicants.sort((a, b) => b.fitScore - a.fitScore);

    res.json(allApplicants);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};