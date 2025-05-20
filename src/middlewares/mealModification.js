const meals = require("../models/meals");

const mealModification = async (req, res, next) => {
  try {
    const mealToUpdate = await meals.findById(req.params.id);
    if (!mealToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Meal not found, Meal Id does not exist",
      });
    }

    if (mealToUpdate.restaurantId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this meal",
      });
    }

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = mealModification;
