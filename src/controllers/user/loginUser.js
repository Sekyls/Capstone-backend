const users = require("../../models/users");
const { validateLogin } = require("../../validations/userValidations");
const { comparePassword } = require("../../utils/hashPassword");
const generateToken = require("../../utils/tokenGeneration");

const loginUser = async (req, res) => {
  try {
    const userLoginData = req.body;
    const { error, value: cleanedUserLoginData } = validateLogin(userLoginData);
    if (error) {
      return res
        .status(406)
        .json({ message: "Login Details Invalid", error: error.message });
    }
    const userExists = await users
      .findOne({
        email: cleanedUserLoginData.email,
      })
      .lean();
    if (!userExists) {
      return res.status(404).json({
        message: "Email is invalid/non-existant. Please enter a valid email",
      });
    }
    const hashedPassword = userExists.password;

    const isMatch = await comparePassword(
      cleanedUserLoginData.password,
      hashedPassword
    );
    if (!isMatch) {
      return res.status(406).json({
        message: "Wrong/Invalid Password. Please enter a valid password",
      });
    }
    const token = await generateToken(userExists._id, userExists.role);
    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }
    res
      .status(202)
      .json({ success: true, token: token, role: userExists.role });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = loginUser;
