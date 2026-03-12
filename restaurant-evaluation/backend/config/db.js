const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGO_URI from env:", process.env.MONGO_URI ? "FOUND" : "NOT FOUND");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;