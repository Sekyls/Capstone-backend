const restaurants = require("../../models/restaurants");
const getRestaurants = async (req, res) => {
  try {
    const allRestaurants = await restaurants.find().lean();
    return res.status(200).json({
      success: true,
      count: allRestaurants.length,
      restaurants: allRestaurants,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ message: error.message });
  }
};

module.exports = getRestaurants;
