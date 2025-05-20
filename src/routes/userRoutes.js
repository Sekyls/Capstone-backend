const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/userAuthJWT");
const deleteUser = require("../controllers/user/deleteUser");
const getUser = require("../controllers/user/getUser");
const loginUser = require("../controllers/user/loginUser");
const registerUser = require("../controllers/user/registerUser");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUser);
router.delete("/me", authMiddleware, deleteUser);

module.exports = router;
