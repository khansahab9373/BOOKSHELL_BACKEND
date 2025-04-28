import express from "express";
import User from "../models/user.js";
import { authenticateToken } from "./userAuth.js";

const router = express.Router();

// Add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    if (!bookid || !id) {
      return res.status(400).json({ message: "Missing bookid or userid" });
    }

    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove book from favourites
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    if (!bookid || !id) {
      return res.status(400).json({ message: "Missing bookid or userid" });
    }

    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookFavourite = userData.favourites.includes(bookid);
    if (!isBookFavourite) {
      return res.status(400).json({ message: "Book not found in favourites" });
    }

    await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    return res.status(200).json({ message: "Book removed from favourites" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get favourite books of a particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ message: "Missing userid" });
    }

    const userData = await User.findById(id).populate("favourites");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const favouriteBooks = userData.favourites;
    return res.json({
      status: "Success",
      data: favouriteBooks,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

export default router;
