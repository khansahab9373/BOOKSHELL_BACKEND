import Book from "../models/book.js";
import Order from "../models/order.js";
import User from "../models/user.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    if (!order || order.length === 0) {
      return res.status(400).json({ status: "Error", message: "Order data is required." });
    }

    for (const orderData of order) {
      const bookExists = await Book.findById(orderData._id);
      if (!bookExists) {
        return res.status(400).json({
          status: "Error",
          message: `Book with ID ${orderData._id} not found.`,
        });
      }

      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
        $pull: { cart: orderData._id },
      });
    }

    return res.json({ status: "Success", message: "Order Placed Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Error", message: "An error occurred" });
  }
};

// Get Order History of User
export const getOrderHistory = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    if (!userData) {
      return res.status(404).json({ status: "Error", message: "User not found." });
    }

    const ordersData = userData.orders.reverse();
    return res.json({ status: "Success", data: ordersData });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Error", message: "An error occurred" });
  }
};

// Admin: Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const user = await User.findById(req.headers.id);
    if (user.role !== "admin") {
      return res.status(403).json({
        status: "Error",
        message: "You do not have permission to view all orders.",
      });
    }

    const userData = await Order.find()
      .populate("book")
      .populate("user")
      .sort({ createdAt: -1 });

    return res.json({ status: "Success", data: userData });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Error", message: "An error occurred" });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const orderToUpdate = await Order.findById(id);
    if (!orderToUpdate) {
      return res.status(404).json({ status: "Error", message: "Order not found." });
    }

    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({ status: "Success", message: "Status Updated Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Error", message: "An error occurred" });
  }
};
