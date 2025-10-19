// backend/seedAdmin.js
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import User from "./models/User.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@gmail.com";
    const exists = await User.findOne({ email: adminEmail });
    if (exists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const admin = new User({
      fullname: "Administrator",
      email: adminEmail,
      password: "admin1234", // will be hashed by model pre-save
      role: "admin",
    });

    await admin.save();
    console.log("Admin seeded:", admin.email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
