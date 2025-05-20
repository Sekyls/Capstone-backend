const app = require("./src/app");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const startServer = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL, options);
    console.log("MongoDB Connected Succesffuly....");

    const server = app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server started and running succesfully on port ${process.env.PORT}`
      );
    });

    server.on("error", (error) => {
      console.error("Server Connection failed", error.stack);
    });
  } catch (error) {
    console.error("Database Connection Failed: " + error.message);
    process.exit(1);
  }
};

startServer();
