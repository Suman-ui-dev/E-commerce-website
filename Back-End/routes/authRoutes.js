import express from "express";
const router = express.Router();
import { signup, login, forgotPassword } from "../controllers/authController.js"; // Ensure to add .js extension

// Signup Route
router.post("/signup", signup);

// Other routes
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

export default router; // Use export default to allow default import