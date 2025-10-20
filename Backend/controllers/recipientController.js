import Recipient from "../models/Recipient.js";
import User from "../models/User.js";
import Donor from "../models/Donor.js";
import {sendEmail} from "../utils/mailer.js";
import crypto from "crypto";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";

export const addRecipient = async (req, res) => {
  try {
    const { name, email, bloodType, hospital, urgency } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not registered" });
    }

    const newRecipient = new Recipient({
      name,
      email,
      bloodType,
      hospital,
      urgency,
    });

    const savedRecipient = await newRecipient.save();
    res.status(201).json({
      message: "Blood request submitted successfully",
      recipient: savedRecipient,
    });
  } catch (error) {
    console.error("Error adding recipient:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.find().sort({ createdAt: -1 });
    res.json(recipients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipients" });
  }
};

export const getRecipientById = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id);
    if (!recipient)
      return res.status(404).json({ message: "Recipient not found" });
    res.json(recipient);
  } catch (error) {
    res.status(400).json({ error: "Invalid recipient ID" });
  }
};

export const deleteRecipient = async (req, res) => {
  try {
    const recipient = await Recipient.findByIdAndDelete(req.params.id);
    if (!recipient)
      return res.status(404).json({ message: "Recipient not found" });
    res.json({ message: "Recipient deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Invalid recipient ID" });
  }
};

// ✅ NEW: Get total recipient count
export const getRecipientCount = async (req, res) => {
  try {
    const count = await Recipient.countDocuments();
    res.json({ totalRecipients: count });
  } catch (error) {
    console.error("Error in getRecipientCount:", error);
    res.status(500).json({ message: error.message });
  }
};

// Approve a recipient
export const approveRecipient = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    recipient.approved = true;
    await recipient.save();

    res.json({ message: "Recipient approved successfully", recipient });
  } catch (err) {
    console.error("Error approving recipient:", err);
    res.status(500).json({ message: err.message });
  }
};


export const approveTheRecipient = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Update recipient status
    const recipient = await Recipient.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    // 2️⃣ Find matching donors
    const donors = await Donor.find({ bloodGroup: recipient.bloodType });

    // 3️⃣ Send email to each donor
    for (const donor of donors) {
      // Generate a unique token
      const token = crypto.randomBytes(16).toString("hex");

      // Save pending confirmation in DB
      donor.confirmedDonations.push({ recipientId: recipient._id, status: "pending", token });
      await donor.save();

      // Generate Yes/No links
      const yesLink = `${BASE_URL}/api/donors/confirm/${token}?status=yes`;
      const noLink = `${BASE_URL}/api/donors/confirm/${token}?status=no`;

      // Send email
      await sendEmail(
        donor.email,
        "Urgent: Blood Request Matched",
        `Dear ${donor.name}, a recipient requires your blood group (${recipient.bloodType}). Please confirm availability.`,
        `<p>Dear <b>${donor.name}</b>,</p>
         <p>A recipient requiring <b>${recipient.bloodType}</b> blood has been approved.</p>
         <p>Please confirm your availability:</p>
         <a href="${yesLink}" style="padding:10px 20px;background:green;color:white;text-decoration:none;">Yes</a>
         <a href="${noLink}" style="padding:10px 20px;background:red;color:white;text-decoration:none;">No</a>`
      );
    }

    res.json({ message: "Recipient approved and emails sent to matching donors." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};