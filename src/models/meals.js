const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    trim: true,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const meals = mongoose.model("meals", mealSchema);
module.exports = meals;
