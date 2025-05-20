const restaurants = require("../../models/restaurants");
const mongoose = require("mongoose");

const deleteRestaurant = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(restaurantID)) {
      return res.status(406).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedRestaurant = await restaurants.findOneAndDelete({
      userId: restaurantID,
    });
    if (!deletedRestaurant) {
      return res.status(404).json({
        success: false,
        message: "No restaurant found to delete",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedRestaurant,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = deleteRestaurant;
