const User = require("../model/user_model");
const bcrypt = require("bcryptjs");

const adminId = process.env.ADMIN_ID;
const adminPassword = process.env.ADMIN_PASSWORD;

async function adminSeeder() {
  const adminExists = await User.findOne({ userEmail: adminId });

  if (adminExists) {
    return console.log("Admin exist. proceed further.");
  }

  await User.create({
    userName: "admin",
    userEmail: adminId,
    userPassword: await bcrypt.hashSync(adminPassword, 10),
    userContact: "9810101010",
    role: "Admin",
    approved: true,
  });

  console.log("Admin created successfully.");
}

module.exports = adminSeeder;
