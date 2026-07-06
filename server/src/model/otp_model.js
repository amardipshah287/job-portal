const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpModel = new Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userOtp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const Otp = mongoose.model("Otp", otpModel);
module.exports = Otp;
