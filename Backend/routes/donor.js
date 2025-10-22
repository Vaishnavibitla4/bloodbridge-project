import express from "express";
import {
  addDonor,
  editDonor,
  deleteDonor,
  getDonors,
  getDonorById,
  getDonorByUserId,
  getDonorByEmail,
  getDonorCount,
  getMatches,
  getDonorBloodTypeStats,
  confirmDonation,
} from "../controllers/donorController.js";
import Donor from "../models/Donor.js";

const router = express.Router();

// CRUD Routes
router.post("/", addDonor);
router.get("/", getDonors);

router.get("/blood-type-stats", getDonorBloodTypeStats);
router.get("/count", getDonorCount);
router.get("/matches", getMatches);

// ✅ NEW: Search Donors by Blood Type
router.get("/search/:bloodType", async (req, res) => {
  try {
    const { bloodType } = req.params;

    // Case-insensitive search for A+, O-, etc.
    const donors = await Donor.find({
      bloodType: { $regex: new RegExp(`^${bloodType}$`, "i") },
    });

    if (!donors.length) {
      return res.status(404).json({ message: "No donors found with this blood type." });
    }

    res.json(donors);
  } catch (err) {
    console.error("Error fetching donors by blood type:", err);
    res.status(500).json({ error: "Server error while fetching donors." });
  }
});

router.get("/:id", getDonorById);
router.put("/:id", editDonor);
router.delete("/:id", deleteDonor);

// Lookup Routes
router.get("/user/:userId", getDonorByUserId);
router.get("/email/:email", getDonorByEmail);

// Check if donor exists by email
router.get("/check/:email", async (req, res) => {
  try {
    const donor = await Donor.findOne({ email: req.params.email });
    if (!donor) return res.status(404).json({ exists: false });
    res.json({ exists: true, donor });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/donors/activity-stats
router.get("/activity-stats", async (req, res) => {
  try {
    const donors = await Donor.find();
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    let active = 0;
    let inactive = 0;
    let newRegistrations = 0;

    donors.forEach((donor) => {
      if (!donor.lastDonationDate) {
        newRegistrations++;
      } else {
        const lastDonation = new Date(donor.lastDonationDate);
        if (lastDonation <= threeMonthsAgo) {
          active++;
        } else {
          inactive++;
        }
      }
    });

    res.json({ active, inactive, newRegistrations });
  } catch (error) {
    console.error("Error computing donor activity stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Blood Type Distribution
router.get("/bloodtype-distribution", async (req, res) => {
  try {
    const distribution = await Donor.aggregate([
      {
        $group: {
          _id: "$bloodType",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(distribution);
  } catch (error) {
    console.error("Error fetching blood type distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/confirm/:token", confirmDonation);

export default router;