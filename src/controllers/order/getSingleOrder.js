const { default: mongoose } = require("mongoose");
const orders = require("../../models/orders");
const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order Id",
      });
    }

    const order = await orders.findById(orderId).lean();
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Requested Order not found",
      });
    }

    if (
      req.user.role === "customer" &&
      order.customerId.toString() === req.user.userId
    ) {
      return res.status(200).json({
        success: true,
        data: order,
      });
    } else if (
      req.user.role === "restaurant" &&
      order.restaurantId.toString() === req.user.userId
    ) {
      return res.status(200).json({
        success: true,
        data: order,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorised to access requested order",
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

module.exports = getSingleOrder;
