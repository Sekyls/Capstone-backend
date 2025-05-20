const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/userAuthJWT");
const authorizeRoles = require("../middlewares/authorizeRoles");
const getRestaurants = require("../controllers/restaurant/getRestaurants");
const getRestaurant = require("../controllers/restaurant/getRestaurant");
const newRestaurant = require("../controllers/restaurant/newRestaurant");
const deleteRestaurant = require("../controllers/restaurant/deleteRestaurant");
const updateRestaurant = require("../controllers/restaurant/updateRestaurant");

// console.log("[DEBUG] Middleware Types:", {
//   authMiddleware: typeof authMiddleware, 
//   authorizeRoles: typeof authorizeRoles("restaurant"), 
//   newRestaurant: typeof newRestaurant, 
// });

router
  .get("/", getRestaurants)
  .get("/:id", authMiddleware, getRestaurant)
  .post("/:id", authMiddleware, authorizeRoles("restaurant"), newRestaurant)
  .delete(
    "/:id",
    authMiddleware,
    authorizeRoles("restaurant"),
    deleteRestaurant
  )
  .patch("/me", authMiddleware, authorizeRoles("restaurant"), updateRestaurant);

module.exports = router;
