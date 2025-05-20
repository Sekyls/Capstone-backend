const jwt = require("jsonwebtoken");

const generateToken = (userId, userRole) => {
  // import jwt secret key
  const JWT_SECRET = process.env.JWT_SECRET;

  // Create token payload
  const payload = { userId: userId, role: userRole };

  // Create token expiration
  const tokenExpiration = { expiresIn: "1h" };

  // Generate and sign token
  const token = jwt.sign(payload, JWT_SECRET, tokenExpiration);

  return token;
};

module.exports = generateToken;
