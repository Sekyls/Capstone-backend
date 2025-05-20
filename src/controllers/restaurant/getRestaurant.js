const restaurants = require("../../models/restaurants");
const mongoose = require("mongoose");

const getRestaurant = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(restaurantID)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    const singleRestaurant = await restaurants
      .findOne({ userId: restaurantID })
      .lean();
    if (!singleRestaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurent not found",
      });
    }
    res.status(200).json({
      success: true,
      data: singleRestaurant,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = getRestaurant;
