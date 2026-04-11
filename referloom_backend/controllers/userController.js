// referloom_backend/controllers/userController.js
import User from "../models/User.js";

// @desc    Get current logged in user profile
// @route   GET /api/users/profile
// @access  Private
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('projects');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get user by ID (Powers your frontend useProfileAccess.js hook)
// @route   GET /api/users/:id
// @access  Private
// referloom_backend/controllers/userController.js

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Guard: Check if ID is provided and is a valid MongoDB ObjectId
    if (!id || id === "undefined" || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "A valid User ID is required" });
    }

    const user = await User.findById(id)
      .select("-password -otp -otpExpiresAt")
      .populate('projects'); // Ensure this matches your User model ref
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ ERROR IN GETUSERBYID:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update Student Profile Details (Skills, Course, etc.)
// @route   PUT /api/users/profile
// @access  Private (Student)
export const updateProfile = async (req, res) => {
  try {
    // ✅ Extract experience from req.body
    const { course, semester, university, skills, experience } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { 
        $set: { 
          "studentDetails.course": course,
          "studentDetails.semester": semester,
          "studentDetails.university": university,
          "studentDetails.skills": skills,
          "studentDetails.experience": experience // ✅ Save it to DB
        } 
      },
      { new: true } 
    ).select("-password").populate('projects');

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update Visibility Mode (Private <-> Public)
// @route   PUT /api/users/visibility
// @access  Private (Students only ideally)
export const updateVisibility = async (req, res) => {
  try {
    const { visibilityMode } = req.body;

    if (!['private', 'public'].includes(visibilityMode)) {
      return res.status(400).json({ message: "Invalid visibility mode." });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { visibilityMode },
      { new: true }
    ).select("-password").populate('projects');

    res.json({ message: `Profile is now ${visibilityMode}`, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Grant a recruiter/alumni full access to this profile
// @route   POST /api/users/grant-access
// @access  Private (Students only)
export const grantAccess = async (req, res) => {
  try {
    const { targetUserId } = req.body; 

    const user = await User.findById(req.user.id);

    if (user.grantedAccess.includes(targetUserId)) {
      return res.status(400).json({ message: "Access already granted to this user." });
    }

    user.grantedAccess.push(targetUserId);
    await user.save();

    res.json({ message: "Access granted successfully.", grantedAccess: user.grantedAccess });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Revoke access from a recruiter/alumni
// @route   POST /api/users/revoke-access
// @access  Private (Students only)
export const revokeAccess = async (req, res) => {
  try {
    const { targetUserId } = req.body;

    const user = await User.findById(req.user.id);
    
    user.grantedAccess = user.grantedAccess.filter(
      id => id.toString() !== targetUserId.toString()
    );
    
    await user.save();

    res.json({ message: "Access revoked.", grantedAccess: user.grantedAccess });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// referloom_backend/controllers/userController.js
