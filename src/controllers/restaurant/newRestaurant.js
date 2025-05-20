const restaurants = require("../../models/restaurants");
const {
  restaurantValidation,
} = require("../../validations/restaurantValidations");

const newRestaurant = async (req, res) => {
  try {
    const { error, value: cleanedData } = restaurantValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const userId = req.user.userId;
    cleanedData.userId = userId;
    const createdRestaurant = await restaurants.create(cleanedData);
    res.status(201).json({
      success: true,
      data: createdRestaurant,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = newRestaurant;
