const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userContact: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Company", "Seeker"],
      default: "Company",
    },
    userSkills: {
      type: [String],
      default: [],
    },
    userResume: {
      type: String,
      default: null,
    },
    companyDescription: {
      type: String,
      default: null,
    },
    companyLogo: {
      type: String,
      default: null,
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);
module.exports = User;
