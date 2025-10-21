import Donor from "../models/Donor.js";
import User from "../models/User.js";
import Recipient from "../models/Recipient.js";
import { sendEmail } from "../utils/mailer.js";
import crypto from "crypto";

// ✅ Add Donor
export const addDonor = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // 2. Create donor with userId from User
    const donor = new Donor({
      ...req.body,
      userId: user._id
    });

    await donor.save();
    res.status(201).json({ message: "Donor added successfully", donor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ✅ Get donor by userId
export const getDonorByUserId = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.params.userId });
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ Edit Donor (fixed response)
export const editDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return updated document
      runValidators: true,
    });

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // ✅ Return donor directly (not nested)
    res.status(200).json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// ✅ Delete Donor
export const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Donors
export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Donor by ID
export const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get donor by email
export const getDonorByEmail = async (req, res) => {
  try {
    const donor = await Donor.findOne({ email: req.params.email });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ NEW: Get Total Donor Count
export const getDonorCount = async (req, res) => {
  try {
    const count = await Donor.countDocuments();
    res.json({ totalDonors: count });
  } catch (error) {
    console.error("Error fetching donor count:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getMatches = async (req, res) => {
  try {
    // Get all approved donors
    const donors = await Donor.find();
    
    // Get all unapproved recipients
    const recipients = await Recipient.find({ approved: false });

    const matches = [];

    donors.forEach((donor) => {
      recipients.forEach((recipient) => {
        if (donor.bloodGroup === recipient.bloodType) {
          matches.push({
            donor: donor.name,
            donorId: donor._id,
            recipient: recipient.name,
            recipientId: recipient._id,
            blood: donor.bloodGroup,
          });
        }
      });
    });

    res.json(matches);
  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDonorBloodTypeStats = async (req, res) => {
  try {
    const stats = await Donor.aggregate([
      {
        $group: {
          _id: "$bloodGroup", // field name in your donor schema
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const result = {};
    stats.forEach((s) => {
      result[s._id] = s.count;
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching blood type stats:", error);
    res.status(500).json({ message: "Server error fetching blood type stats" });
  }
};


export const confirmDonation = async (req, res) => {
  try {
    const { token } = req.params;
    const { status } = req.query; // yes or no

    // Find donor with this token
    const donor = await Donor.findOne({ "confirmedDonations.token": token });
    if (!donor) return res.status(404).send("Invalid or expired token.");

    // Find the specific donation entry
    const donationEntry = donor.confirmedDonations.find(d => d.token === token);
    if (!donationEntry || donationEntry.status !== "pending") {
      return res.send("<h2>This link has already been used or expired ✅</h2>");
    }

    // Update status
    donationEntry.status = status === "yes" ? "confirmed" : "declined";
    await donor.save();

    if (status === "yes") {
      const recipient = await Recipient.findById(donationEntry.recipientId);

      // Send donor info to recipient
      await sendEmail(
        recipient.email,
        "Donor Confirmed for Your Request",
        `${donor.name} has confirmed to donate.`,
        `<p>Dear ${recipient.name},</p>
         <p>${donor.name} (Blood Group: ${donor.bloodGroup}) has confirmed to donate.</p>
         <p>Contact Info:</p>
         <ul>
           <li>Email: ${donor.email}</li>
           <li>Phone: ${donor.contact}</li>
           <li>Address: ${donor.address}</li>
         </ul>`
      );
    }

    // Notify admin
    await sendEmail(
      "bloodbridge@gmail.com",
      `Donor ${donor.name} responded`,
      `${donor.name} has responded ${status} for recipient request.`,
      `<p>Donor ${donor.name} responded <b>${status}</b> for recipient ID: ${donationEntry.recipientId}</p>`
    );

    res.send(`<h2>Thank you! Your response has been recorded as <b>${status}</b> ✅</h2>`);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
