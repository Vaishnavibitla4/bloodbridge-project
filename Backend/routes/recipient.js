import express from "express";


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
// ✅ NEW: Get total recipient count
router.get("/count", getRecipientCount);
router.get("/:id", getRecipientById);
router.delete("/:id", deleteRecipient);
router.put("/approve/:id", approveRecipient); // ✅ new route
router.put("/approve-with-email/:id", approveTheRecipient);



export default router;