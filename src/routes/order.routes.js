import express from "express";
import { authMiddleware } from "../middlewares/authHandler.js";
import {
  createOrder,
  getRecentOrders,
  updateOrder,
  getAllOrders,
} from "../controllers/apiController.js";

const router = express.Router();

/**
 * Assignment C
 */
// get recent 7 days orders
router.get("/recent", getRecentOrders);

router.get("/", getAllOrders);

router.post("/", authMiddleware, createOrder);
router.put("/:id", authMiddleware, updateOrder);

export default router;
