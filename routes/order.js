import express from "express";
import { authenticateToken } from "./userAuth.js";
import {
  placeOrder,
  getOrderHistory,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/place-order", authenticateToken, placeOrder);
router.get("/get-order-history", authenticateToken, getOrderHistory);
router.get("/get-all-orders", authenticateToken, getAllOrders);
router.put("/update-status/:id", authenticateToken, updateOrderStatus);

export default router;
