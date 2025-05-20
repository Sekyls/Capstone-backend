const meals = require("../../models/meals");
const mongoose = require("mongoose");

const getSingleMeal = async (req, res) => {
  try {
    const mealID = req.params.id;
    const verifyMealID = mongoose.Types.ObjectId.isValid(mealID);
    if (!verifyMealID) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal ID",
      });
    }
    const requestedMeal = await meals.findById(mealID).lean();
    if (!requestedMeal) {
      return res.status(404).json({
        success: false,
        message: "Requested meal not found",
      });
    }
    res.status(200).json({
      success: true,
      data: requestedMeal,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = getSingleMeal;
