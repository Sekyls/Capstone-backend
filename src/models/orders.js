const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },

    meal: {
      mealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "meals",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      priceAtOrderTime: {
        type: Number,
        required: true,
      },
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const orders = mongoose.model("orders", orderSchema);
module.exports = orders;
