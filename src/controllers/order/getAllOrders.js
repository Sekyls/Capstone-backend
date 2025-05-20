const mongoose = require("mongoose");
const orders = require("../../models/orders");

const getAllOrders = async (req, res) => {
  try {
    const { userId, role } = req.user;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    if (role === "customer") {
      const customerOrders = await orders.find({ customerId: userId }).lean();
      if (customerOrders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found",
        });
      }

      res.status(200).json({
        success: true,
        data: customerOrders,
      });
    } else {
      const restaurantOrders = await orders
        .find({ restaurantId: userId })
        .lean();
      if (restaurantOrders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found",
        });
      }

      res.status(200).json({
        success: true,
        data: restaurantOrders,
      });
    }
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getAllOrders;
