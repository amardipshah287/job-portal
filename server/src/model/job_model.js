const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    location: {
      type: String,
      required: true,
    },
    locationType: {
      type: String,
      enum: ["on-site", "remote"],
      required: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time"],
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    premium: {
      type: Boolean,
      default: false,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobModel);
module.exports = Job;
