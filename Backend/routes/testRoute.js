import express from "express";
import { sendEmail } from "../utils/mailer.js";
const router = express.Router();

router.get("/test-email", async (req, res) => {
  await sendEmail(
    "shreeshakuragayala@gmail.com",
    "Test Email from BloodBridge",
    "This is a plain text test email",
    "<h2>BloodBridge Email System Working ✅</h2>"
  );
  res.send("Email sent successfully!");
});

export default router;
