import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter with explicit Gmail SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,       // Use 465 for SSL
  secure: true,    // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  logger: true,    // Log SMTP communication
  debug: true,     // Show debug messages
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter verification failed:", error);
  } else {
    console.log("Email transporter is ready to send messages");
  }
});

// Reusable function to send email
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `Blood Donation System <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`Email sent successfully to: ${to}`);
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};