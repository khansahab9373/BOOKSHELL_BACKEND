import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Sign Up
export const signUp = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (username.length < 4) {
      return res.status(400).json({ message: "Username length should be greater than 3" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length <= 5) {
      return res.status(400).json({ message: "Password's length should be greater than 5" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, address });
    await newUser.save();

    res.status(200).json({ message: "Sign-up successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Sign In
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (isPasswordValid) {
      const authClaims = [
        { name: existingUser.username },
        { role: existingUser.role },
      ];
      const token = jwt.sign({ authClaims }, "bookstore123", { expiresIn: "30d" });

      return res.status(200).json({
        id: existingUser.id,
        role: existingUser.role,
        token,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get User Info
export const getUserInfo = async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Address
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
