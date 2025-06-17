const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const cors = require("cors");
const mealRoutes = require("./routes/mealRoutes");
const orderRoutes = require("./routes/orderRoutes");
const rateLimiter = require("./middlewares/rateLimiter");
const helmet = require("helmet");

const allowedOrigins = [
  "http://localhost:5173", 
  "https://capstone-frontend-khaki-seven.vercel.app"
];

//MIDDLEWARES
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(rateLimiter);

//ROUTES
app.use("/api/v1/userauth", userRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/meals", mealRoutes);
app.use("/api/v1/orders", orderRoutes);

//GLOBAL ERROR HANDLING
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err, origin) => {
  console.error("Uncaught Exception thrown:", err);
  process.exit(1);
});

module.exports = app;
