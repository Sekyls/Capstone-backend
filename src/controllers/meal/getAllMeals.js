const meals = require("../../models/meals");

const getAllMeals = async (req, res) => {
  try {
    // console.log(req);
    
    const allMeals = await meals.find().lean();
    if (allMeals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Meals resource not found",
      });
    }
    res.status(200).json({
      success: true,
      meals: allMeals,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

module.exports = getAllMeals;
