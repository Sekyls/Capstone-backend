const Joi = require("joi");

const restaurantValidation = (restaurantData) => {
  const schema = Joi.object({
    restaurantName: Joi.string().required().trim().messages({
      "string.empty": "Restaurant name cannot be empty",
      "any.required": "Restaurant name is required",
    }),
    imageUrl: Joi.string().required().trim().messages({
      "string.empty": "imageURL name cannot be empty",
      "any.required": "imageURL name is required",
    }),
    location: Joi.string().required().messages({
      "string.empty": "Location cannot be empty",
      "any.required": "Location is required",
    }),

    description: Joi.string().required().messages({
      "string.empty": "Description cannot be empty",
      "any.required": "Description is required",
    }),
  });
  return schema.validate(restaurantData, { allowUnknown: false });
};

const restaurantUpdateValidation = (restaurantUpdateData) => {
  const schema = Joi.object({
    restaurantName: Joi.string().optional().trim(),
    location: Joi.string().optional(),
    imageUrl: Joi.string().optional().trim(),
    description: Joi.string().optional(),
  });
  return schema.validate(restaurantUpdateData, { allowUnknown: false });
};
module.exports = { restaurantValidation, restaurantUpdateValidation };
