const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PremiumJobSchema = new Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ["khalti"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const PremiumJob = mongoose.model("PremiumJob", PremiumJobSchema);
module.exports = PremiumJob;
