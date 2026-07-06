const mongoose = require("mongoose");
const adminSeeder = require("../scripts/admin_seeder");

const dbConfig = async (URI) => {
  try {
    console.log("Connecting to MongoDB:", URI);
    await mongoose.connect(URI);
    console.log("Database connected successfully.");
    await adminSeeder();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = dbConfig;
