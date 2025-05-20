const orders = require("../../models/orders");
const meals = require("../../models/meals");
const { validateOrderDetails } = require("../../validations/orderValidations");
const mongoose = require("mongoose");
const placeOrder = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Formdata cannot be empty",
      });
    }

    const { error, value: orderDetails } = validateOrderDetails(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(orderDetails.meal.mealId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mealId",
      });
    }

    const meal = await meals
      .findById(orderDetails.meal.mealId)
      .select("restaurantId")
      .lean();

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Ordered meal not found",
      });
    }

    const { userId } = req.user;
    const { restaurantId } = meal;
    orderDetails.customerId = userId;
    orderDetails.restaurantId = restaurantId;

    const placedOrder = await orders.create(orderDetails);
    if (!placedOrder) {
      return res.status(501).json({
        success: false,
        message: "Order placement failed",
      });
    }

    res.status(201).json({
      success: true,
      data: placedOrder,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = placeOrder;
