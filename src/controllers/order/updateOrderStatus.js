const { default: mongoose } = require("mongoose");
const orders = require("../../models/orders");
const { validateOrderStatus } = require("../../validations/orderValidations");

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid orderId",
      });
    }

    const getOrder = await orders.findById(orderId).select("restaurantId");
    if (!getOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (getOrder.restaurantId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this order",
      });
    }

    const { error, value: statusUpdate } = validateOrderStatus(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    const updatedOrderStatus = await orders.findByIdAndUpdate(
      orderId,
      {
        $set: statusUpdate,
      },
      { new: true }
    );

    if (!updatedOrderStatus) {
      return res.status(404).json({
        success: false,
        message: "Status update failed",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedOrderStatus,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = updateOrderStatus;
