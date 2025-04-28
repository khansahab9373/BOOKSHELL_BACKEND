import express from "express";
import User from "../models/user.js";
import { authenticateToken } from "./userAuth.js";

const router = express.Router();

// Add books to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in the cart
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.status(200).json({
        status: "Success",
        message: "Book is already in cart",
      });
    }

    // Add the book to the user's cart
    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });

    return res.status(201).json({
      status: "Success",
      message: "Book added to cart",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Get cart of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();

    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
