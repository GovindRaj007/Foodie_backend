import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// Create an order (protected route)
router.post("/", authMiddleware, createOrder);

// Get orders for the logged-in user (protected route)
router.get("/", authMiddleware, getUserOrders);

export default router;
