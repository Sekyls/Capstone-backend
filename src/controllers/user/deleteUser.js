const users = require("../../models/users");

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: user not authenticated" });
    }
    const deletedUser = await users.deleteOne({ _id: userId });
    if (deletedUser.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Deletion of user data from database failed" });
    }
    res.status(200).json({
      message: "Your profile has been sucessfully deleted",
      details: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    return console.error(error.message);
  }
};
module.exports = deleteUser;
