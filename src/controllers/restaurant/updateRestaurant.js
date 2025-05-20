const restaurants = require("../../models/restaurants");
const mongoose = require("mongoose");
const {
  restaurantUpdateValidation,
} = require("../../validations/restaurantValidations");

const updateRestaurant = async (req, res) => {
  try {
    const restaurantID = req.user.userId;
    const validRestaurantID = mongoose.Types.ObjectId.isValid(restaurantID);
    if (!validRestaurantID) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Update form data cannot be empty",
      });
    }
    const { error, value: cleanedUpdateData } = restaurantUpdateValidation(
      req.body
    );
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data fields",
      });
    }
    const updatedRestaurant = await restaurants.findOneAndUpdate(
      {
        userId: restaurantID,
      },
      { $set: cleanedUpdateData },
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(400).json({
        success: false,
        message: "No changes were made to the restaurant details",
      });
    }
    res.status(201).json({
      success: true,
      data: updatedRestaurant,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = updateRestaurant;
