const Joi = require("joi");

// ✅ Signup Form Validation
function validateSignup(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"
        )
      )
      .message(
        "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character"
      )
      .required(),

    role: Joi.string().valid("customer", "restaurant").required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
  });

  return schema.validate(data, { allowUnknown: false });
}

// ✅ Login Form Validation
function validateLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data, { allowUnknown: false });
}

module.exports = {
  validateSignup,
  validateLogin,
};
