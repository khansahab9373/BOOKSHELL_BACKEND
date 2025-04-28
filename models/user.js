import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // Fixed typo: 'require' -> 'required'
      unique: true,
    },
    email: {
      type: String,
      required: true, // Fixed typo: 'require' -> 'required'
    },
    password: {
      type: String,
      required: true, // Fixed typo: 'require' -> 'required'
    },
    address: {
      type: String,
      required: true, // Fixed typo: 'require' -> 'required'
    },
    avatar: {
      type: String,
      default:
        "https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--telegram-logo-man-ui-pack-miscellaneous-icons-840229.png?f=webp&w=256 ",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books",
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
