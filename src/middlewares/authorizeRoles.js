const authorizeRoles =  (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;
      if (!allowedRoles.includes(userRole.toLowerCase().trim())) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied: You do not have permission to perform this action.",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Authorization middleware error" });
    }
  };
};

module.exports = authorizeRoles;
