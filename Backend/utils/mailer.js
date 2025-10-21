import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Transporter setup using Gmail (or any SMTP service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password (not normal password)
  },
});

// Reusable function
export const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `Blood Donation System <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

