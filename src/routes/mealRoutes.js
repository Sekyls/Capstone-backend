const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/userAuthJWT");
const authorizeRoles = require("../middlewares/authorizeRoles");
const mealModification = require("../middlewares/mealModification");
const getAllMeals = require("../controllers/meal/getAllMeals");
const getSingleMeal = require("../controllers/meal/getSingleMeal");
const createMeal = require("../controllers/meal/createMeal");
const updateMeal = require("../controllers/meal/updateMeal");
const deleteMeal = require("../controllers/meal/deleteMeal");
router
  .get("/", authMiddleware, getAllMeals)
  .get("/:id", authMiddleware, getSingleMeal)
  .post("/me", authMiddleware, authorizeRoles("restaurant"), createMeal)
  .patch(
    "/:id",
    authMiddleware,
    authorizeRoles("restaurant"),
    mealModification,
    updateMeal
  )
  .delete(
    "/:id",
    authMiddleware,
    authorizeRoles("restaurant"),
    mealModification,
    deleteMeal
  );

module.exports = router;
