import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  contact: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  area: { type: String, required: true },
  lastDonationDate: { type: Date },
  diseaseInfo: { type: String },
  registrationDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,unique: true },
  confirmedDonations: [
    {
      recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipient" },
      status: { type: String, enum: ["pending", "confirmed", "declined"], default: "pending" },
      token: String,
    },
  ],
}, { timestamps: true });

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;
