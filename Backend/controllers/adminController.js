import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token, admin });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin settings update
export const updateAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne();

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (email) admin.email = email;
    if (password) admin.password = password;

    await admin.save();

    res.status(200).json({ message: "Admin credentials updated successfully" });
  } catch (err) {
    console.error("Admin update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
