const Joi = require("joi");

const validateOrderDetails = (orderDetails) => {
  const orderSchema = Joi.object({
    meal: {
      mealId: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      priceAtOrderTime: Joi.number().required(),
    },

    totalPrice: Joi.number().required().positive(),

    deliveryAddress: Joi.string().required().trim().min(20),

    notes: Joi.string().optional().trim().max(200),

    isPaid: Joi.boolean().optional(),
  });
  return orderSchema.validate(orderDetails, { allowUnknown: false });
};

const validateOrderStatus = (orderDetails) => {
  const orderStatusSchema = Joi.object({
    status: Joi.string()
      .required()
      .valid("preparing", "ready", "completed", "cancelled"),
  });
  return orderStatusSchema.validate(orderDetails, { allowUnknown: false });
};

module.exports = { validateOrderDetails, validateOrderStatus };
