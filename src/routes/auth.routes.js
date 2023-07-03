import express from "express";
import {
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authHandler.js";

const router = express.Router();

/**
 * Authentication routes
 */
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/all-users", authMiddleware, getAllUsers);

router.get("/user", authMiddleware, getUser);

export default router;
