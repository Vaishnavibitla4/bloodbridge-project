import express from "express";
import { loginAdmin, updateAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.put("/update", updateAdmin);

export default router;
