const meal = require("../../models/meals");
const mongoose = require("mongoose");
const {
  createMealDataValidation,
} = require("../../validations/mealValidations");
const meals = require("../../models/meals");

const createMeal = async (req, res) => {
  try {
    const verifyUserId = mongoose.Types.ObjectId.isValid(req.user.userId);
    if (!verifyUserId) {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }
    const { error, value: validatedMealData } = createMealDataValidation(
      req.body
    );
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    validatedMealData.restaurantId = req.user.userId;
    const createdMeal = await meals.create(validatedMealData);
    res.status(201).json({
      success: true,
      data: createdMeal,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = createMeal;
