import express from "express";
import { authMiddleware } from "../middlewares/authHandler.js";
import {
  createCompany,
  getUsersByCompanyId,
  updateCompany,
  getAllCompanies,
} from "../controllers/apiController.js";

const router = express.Router();

/**
 * Company Routes
 */

/**
 * Assignment B
 */
router.get("/:id/users", getUsersByCompanyId);

router.get("/", getAllCompanies);

router.post("/", authMiddleware, createCompany);
router.put("/:id", authMiddleware, updateCompany);

export default router;
