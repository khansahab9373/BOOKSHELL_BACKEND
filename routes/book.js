import express from "express";

import {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
  getBookById,
} from "../controllers/bookController.js";
import { authenticateToken } from "./userAuth.js";

const router = express.Router();

router.post("/add-book", authenticateToken, addBook);
router.put("/update-book", authenticateToken, updateBook);
router.delete("/delete-book", authenticateToken, deleteBook);
router.get("/get-all-books", getAllBooks);
router.get("/get-recent-books", getRecentBooks);
router.get("/get-book-by-id/:id", getBookById);

export default router;
