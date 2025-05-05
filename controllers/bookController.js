import User from "../models/user.js";
import Book from "../models/book.js";

// Add Book (Admin only)
export const addBook = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You don't have access to perform admin work" });
    }
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(200).json({
      message: "Book updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Get All Books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Get Recent Books
export const getRecentBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Get Book by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
