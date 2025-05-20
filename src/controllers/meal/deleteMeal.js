const mongoose = require("mongoose");
const meals = require("../../models/meals");

const deleteMeal = async (req, res) => {
  try {
    const verifyMealId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!verifyMealId) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal ID",
      });
    }

    const deletedMeal = await meals.findByIdAndDelete(req.params.id).lean();
    if (!deletedMeal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found or already deleted",
      });
    }

    res.status(201).json({
      success: true,
      data: deletedMeal,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = deleteMeal;
