const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    pidx: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dataFromVerificationReq: {
      type: Object,
    },
    apiQueryFromUser: {
      type: Object,
    },
    paymentMethod: {
      type: String,
      enum: ["khalti"],
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "pending",
    },
    paymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
