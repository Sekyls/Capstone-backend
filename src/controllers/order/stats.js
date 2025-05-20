const orders = require("../../models/orders");

const getOrderStats = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const totalOrders = await orders.countDocuments({ customerId });
    const completedOrders = await orders.countDocuments({
      customerId,
      status: "completed",
    });
    const pendingOrders = await orders.countDocuments({
      customerId,
      status: "pending",
    });

    res.json({
      stats: {
        totalOrders,
        completedOrders,
        pendingOrders,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrdersHistory = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const orderHistory = await orders.find({ customerId }).lean();
    res.json({ orders: orderHistory });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { getOrderStats, getOrdersHistory };
