import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import donorRoutes from "./routes/donor.js";
import recipientRoutes from "./routes/recipient.js";
import adminRoutes from "./routes/admin.js";
import testEmailRoute from "./routes/testRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware


// ✅ Allow frontend (React running on 3000)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());

app.get('/healthz', (req, res) => {
  res.send('OK');
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/recipients", recipientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", testEmailRoute);




// Error handler
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled Error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

  

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));


