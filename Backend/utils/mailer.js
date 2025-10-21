// utils/mailer.js
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

// ✅ Set SendGrid API key from environment variables
sgMail.setApiKey(process.env.EMAIL_PASS);

/**
 * Reusable function to send email
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} text - plain text body
 * @param {string} html - HTML body
 */
export const sendEmail = async (to, subject, text, html) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_USER || "bloodbridge4u@gmail.com", // verified sender
      subject,
      text,
      html,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    // If SendGrid returns detailed errors
    if (error.response && error.response.body) {
      console.error(error.response.body);
    }
  }
};
