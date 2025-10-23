import express from "express";
import Recipient from "../models/Recipient.js";


import {
  addRecipient,
  getRecipients,
  getRecipientById,
  deleteRecipient,
  getRecipientCount, // ✅ NEW
  approveRecipient, // ✅ NEW
  approveTheRecipient,
} from "../controllers/recipientController.js";

const router = express.Router();

router.post("/", addRecipient);
router.get("/", getRecipients);
// GET /api/recipients/pending-count
router.get("/pending-count", async (req, res) => {
  try {
    const pendingCount = await Recipient.countDocuments({ approved: false });
    res.json({ pendingCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ NEW: Get total recipient count
router.get("/count", getRecipientCount);
router.get("/:id", getRecipientById);
router.delete("/:id", deleteRecipient);
router.put("/approve/:id", approveRecipient); // ✅ new route
router.put("/approve-with-email/:id", approveTheRecipient);



export default router;