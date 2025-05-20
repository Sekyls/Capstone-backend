const users = require("../../models/users");

const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: user not authenticated" });
    }
    const userDetails = await users
      .findOne(
        { _id: userId },
        { password: 0 } // Excludes the 'password' field
      )
      .lean();
    if (!userDetails) {
      return res
        .status(500)
        .json({ message: "Fetching of user data from database failed" });
    }
    res.status(200).json({
      success: true,
      userDetails: userDetails,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    return console.error(error.message);
  }
};
module.exports = getUser;
