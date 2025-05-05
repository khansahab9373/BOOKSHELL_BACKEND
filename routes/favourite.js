import express from "express";
import { authenticateToken } from "./userAuth.js";
import {
  addBookToFavourite,
  removeBookFromFavourite,
  getFavouriteBooks,
} from "../controllers/favouriteController.js";

const router = express.Router();

router.put("/add-book-to-favourite", authenticateToken, addBookToFavourite);
router.put("/remove-book-from-favourite", authenticateToken, removeBookFromFavourite);
router.get("/get-favourite-books", authenticateToken, getFavouriteBooks);

export default router;
