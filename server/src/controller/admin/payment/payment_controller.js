const {
  khaltiPaymentInitialization,
  khaltiPaymentVerification,
} = require("../../../services/khalti");
const Payment = require("../../../model/payment_model");
const Job = require("../../../model/job_model");
const PremiumJob = require("../../../model/premium_job_model");

// global messages
const successMessage = {
  status: "Success",
  message: "Success message.",
  data: null,
};

const errorMessage = {
  status: "Error",
  message: "Error message.",
  data: null,
};

async function initializeKhalti(req, res) {
  try {
    const { jobId, website_url } = req.body;
    console.log(jobId, website_url);

    console.log("s1");

    const jobData = await Job.findOne({
      _id: jobId,
    });

    console.log("s2");
    if (!jobData) {
      return res.status(400).send({
        ...errorMessage,
        message: "Job not found",
      });
    }

    console.log(jobData);

    console.log("s3");
    const premiumJobData = await PremiumJob.create({
      job: jobId,
      paymentMethod: "khalti",
    });

    console.log("s4");
    const paymentInitate = await khaltiPaymentInitialization({
      amount: 1000,
      purchase_order_id: premiumJobData._id,
      purchase_order_name: jobData.title,
      return_url: `${process.env.BACKEND_URI}/complete-khalti-payment`,
      website_url,
    });

    console.log("s5");

    return res.status(200).json({
      ...successMessage,
      premiumJobData,
      payment: paymentInitate,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ...errorMessage,
      message: "Error initializing khalti.",
    });
  }
}

async function khaltiPaymentCompletion(req, res) {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;

  console.log(pidx, purchase_order_id, transaction_id);

  console.log("s1");

  try {
    const paymentInfo = await khaltiPaymentVerification(pidx);

    console.log("s2");
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id
    ) {
      return res.status(400).json({
        ...errorMessage,
        message: "Incomplete information",
        paymentInfo,
      });
    }

    console.log("s3");

    const premiumJobData = await PremiumJob.find({
      _id: purchase_order_id,
    });

    console.log("s4");
    if (!premiumJobData) {
      return res.status(400).send({
        ...errorMessage,
        message: "Purchased data not found",
      });
    }

    console.log("s5");

    await PremiumJob.findByIdAndUpdate(purchase_order_id, {
      $set: {
        status: "completed",
      },
    });

    const job = await Job.findById(premiumJobData[0].job);
    console.log(job);
    job.premium = true;
    await job.save();

    console.log("s7");
    const paymentData = await Payment.create({
      pidx,
      amount,
      transactionId: transaction_id,
      job: purchase_order_id,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentMethod: "khalti",
      status: "success",
    });

    console.log("final,s8");
    return res.status(200).redirect("http://localhost:5173/dashboard/provider");
  } catch (error) {
    console.error(error);
    return res.status(400).redirect("http://localhost:5173/dashboard/provider");
  }
}

async function fetchAllPayments(req, res) {
  try {
    const allPayments = await Payment.find();

    if (!allPayments) {
      return res.status(400).json({
        status: "Error",
        message: "No payments found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Payment details fetched successfully.",
      data: allPayments,
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: "Error fetching payment details.",
      data: null,
    });
  }
}

module.exports = {
  initializeKhalti,
  khaltiPaymentCompletion,
  fetchAllPayments,
};
