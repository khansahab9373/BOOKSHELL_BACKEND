import express from "express";
import { authenticateToken } from "./userAuth.js";
import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.put("/add-to-cart", authenticateToken, addToCart);
router.put("/remove-from-cart/:bookid", authenticateToken, removeFromCart);
router.get("/get-user-cart", authenticateToken, getUserCart);

export default router;
