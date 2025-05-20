const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. No token provided.",
      });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Secret key should be in environment variables for production
    const JWT_SECRET = process.env.JWT_SECRET;

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Add user data to request object
    req.user = { userId: decoded.userId, role: decoded.role };

    // Proceed to the next middleware in the stack
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
};

module.exports = authMiddleware;
