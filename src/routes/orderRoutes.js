const express = require("express");
const router = express.Router();
const authorizeRoles = require("../middlewares/authorizeRoles");
const authMiddleware = require("../middlewares/userAuthJWT");
const getAllOrders = require("../controllers/order/getAllOrders");
const getSingleOrder = require("../controllers/order/getSingleOrder");
const placeOrder = require("../controllers/order/placeOrder");
const updateOrderStatus = require("../controllers/order/updateOrderStatus");

// const {
//   getOrderStats,
//   getOrdersHistory,
// } = require("../controllers/order/stats");

router
  // .get("/stats", authMiddleware, getOrderStats)
  // .get("/history", authMiddleware, getOrdersHistory)
  .get("/me", authMiddleware, getAllOrders)
  .get("/:id", authMiddleware, getSingleOrder)
  .post("/", authMiddleware, authorizeRoles("customer"), placeOrder)
  .patch(
    "/:id",
    authMiddleware,
    authorizeRoles("restaurant"),
    updateOrderStatus
  );

module.exports = router;
