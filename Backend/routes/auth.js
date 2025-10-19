import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 
    // `-password` excludes password field from response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});



export default router;