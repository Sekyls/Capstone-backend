const Joi = require("joi");

const createMealDataValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50).trim(),

    description: Joi.string().required().min(20).max(100).trim(),

    category: Joi.string().min(2).max(15).required().trim(),

    price: Joi.number().positive().precision(2).required(),

    imageUrl: Joi.string().required().trim(),
  });

  return schema.validate(data, { allowUnknown: false });
};

const updateMealDataValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().optional().min(2).max(50).trim(),

    description: Joi.string().optional().min(20).max(100).trim(),

    category: Joi.string().min(2).max(15).optional().trim(),

    price: Joi.number().positive().precision(2).optional(),

    imageUrl: Joi.string().optional().trim(),

    isAvailable: Joi.boolean().optional(),
  });

  return schema.validate(data, { allowUnknown: false });
};
module.exports = { createMealDataValidation, updateMealDataValidation };
