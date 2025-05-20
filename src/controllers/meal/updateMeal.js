const mongoose = require("mongoose");
const meals = require("../../models/meals");
const {
  updateMealDataValidation,
} = require("../../validations/mealValidations");

const updateMeal = async (req, res) => {
  try {
    const verifyMealId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!verifyMealId) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal ID",
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Meal update form data cannot be empty",
      });
    }

    const { error, value: validatedUpdateData } = updateMealDataValidation(
      req.body
    );
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const updatedMeal = await meals
      .findByIdAndUpdate(
        req.params.id,
        { $set: validatedUpdateData },
        { new: true }
      )
      .lean();

    res.status(201).json({
      success: true,
      data: updatedMeal,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = updateMeal;
