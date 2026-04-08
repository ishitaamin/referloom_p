// src/controllers/otpController.js
import Otp from "../models/Otp.js";

const generate4DigitOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // e.g. "4821"
};

export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    // rate limiting simple check: max 3 OTPs in last 10 minutes (example)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentCount = await Otp.countDocuments({ phone, createdAt: { $gte: tenMinutesAgo } });
    if (recentCount >= 3) {
      return res.status(429).json({ message: "Too many OTP requests. Try again later." });
    }

    const otp = generate4DigitOtp();
    const ttlMinutes = 5;
    const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

    await Otp.create({ phone, otp, expiresAt });

    // For dev: return the OTP in response (remove in production)
    console.log(`OTP for ${phone}: ${otp}`);

    // TODO: integrate real SMS provider here (Twilio/MSG91/etc.)
    return res.json({ message: "OTP sent", otp }); // remove otp key in production
  } catch (error) {
    console.error("sendOtp error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP are required" });

    // find non-expired OTP matching phone + otp
    const now = new Date();
    const record = await Otp.findOne({ phone, otp, expiresAt: { $gte: now } });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // delete OTPs for this phone so they can't be reused
    await Otp.deleteMany({ phone });

    return res.json({ message: "OTP verified" });
  } catch (error) {
    console.error("verifyOtp error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
