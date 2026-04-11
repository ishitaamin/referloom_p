import Mentorship from "../models/Mentorship.js";

// @desc    Student requests mentorship
// @route   POST /api/mentorship/request
export const requestMentorship = async (req, res) => {
  try {
    const { alumniId, message } = req.body;
    const request = await Mentorship.create({
      student: req.user._id,
      alumni: alumniId,
      message
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Failed to send request" });
  }
};

// @desc    Alumni gets pending requests
// @route   GET /api/mentorship/requests
export const getMyRequests = async (req, res) => {
  try {
    const requests = await Mentorship.find({ student: req.user._id })
      .populate('alumni', 'fullName professionalDetails alumni'); // Populates alumni info
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

// @desc    Alumni accepts/rejects request
// @route   PUT /api/mentorship/requests/:id
export const respondToRequest = async (req, res) => {
  try {
    const request = await Mentorship.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, // 'accepted' or 'rejected'
      { new: true }
    );
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};