const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationModel = new Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Shortlisted", "Accepted", "Rejected"],
      default: "Pending",
    },
    resume: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    shortlisterData: {
      type: Map,
      of: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationModel);
module.exports = Application;
