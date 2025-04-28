import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./conn/conn.js";

import User from "./routes/user.js";
import Books from "./routes/book.js";
import Favourite from "./routes/favourite.js";
import Cart from "./routes/cart.js";
import Order from "./routes/order.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Book Store API");
});
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Creating port
app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
