import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "books",
    },
    status: {
      type: String,
      default: "Order Placed", // Keeping the default value as 'Order Placed'
      enum: ["Order Placed", "Out for delivery", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
