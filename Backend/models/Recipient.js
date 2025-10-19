import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Recipient name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true, match: [/\S+@\S+\.\S+/, "Please provide a valid email"] },
    bloodType: { type: String, required: [true, "Blood type is required"] },
    hospital: { type: String, required: [true, "Hospital name is required"], trim: true },
    urgency: { type: String, enum: ["Immediate", "Within 24 Hours", "Not Urgent"], required: [true, "Urgency level is required"] },
    approved: { type: Boolean, default: false }, // ✅ new field
    requestDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Recipient", recipientSchema);
