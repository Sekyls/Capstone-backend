const users = require("../../models/users");
const { validateSignup } = require("../../validations/userValidations");
const { hashPassword } = require("../../utils/hashPassword");

const registerUser = async (req, res) => {
  console.log("Registration request received:", req.body); 

  try {
    //  Validate Input
    const { error, value: cleanedUserData } = validateSignup(req.body);
    if (error) {
      console.log("Validation error:", error.details);
      return res.status(406).json({
        success: false,
        message: "Validation failed",
        error: error.details[0].message,
      });
    }

    //  Check for Existing User
    const userExists = await users.findOne({ email: cleanedUserData.email });
    if (userExists) {
      console.log("Duplicate email attempt:", cleanedUserData.email);
      return res.status(409).json({
        success: false,
        message: `Email ${cleanedUserData.email} already exists`,
        suggestion: "Try resetting password instead",
      });
    }

    //  Hash Password
    const hashedPassword = await hashPassword(cleanedUserData.password);
    if (!hashedPassword) {
      console.error("Password hashing failed");
      return res.status(500).json({
        success: false,
        message: "Account creation failed",
        error: "Password processing error",
      });
    }

    //  Create User
    cleanedUserData.password = hashedPassword;
    const newUser = await users.create(cleanedUserData);

    //  Successful Response
    console.log("New user created:", newUser.email);
    return res.status(201).json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
      },
      message: "Account created successfully",
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = registerUser;
