import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    // Configure the transporter with your email service credentials
    // For development, Gmail is easiest. For production, use AWS SES, SendGrid, etc.
    const transporter = nodemailer.createTransport({
      service: "Gmail", 
      auth: {
        user: process.env.EMAIL_USER, // e.g., your_email@gmail.com
        pass: process.env.EMAIL_PASS, // App Password from Google (not your regular password)
      },
    });

    const mailOptions = {
      from: `"Referloom Support" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      // You can also add html: options.html if you want a pretty HTML email template
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email could not be sent");
  }
};