import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conn = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
};

conn();
