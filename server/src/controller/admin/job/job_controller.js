const mongoose = require("mongoose");
const Job = require("../../../model/job_model");
const User = require("../../../model/user_model");
const Application = require("../../../model/application_model");

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

// create new job
exports.createJob = async (req, res) => {
  try {
    console.log("entered");
    const {
      title,
      description,
      skills,
      salaryRange,
      location,
      locationType,
      jobType,
      expirationDate,
    } = req.body;
    console.log("s1");

    console.log("entered");

    if (
      !title ||
      !description ||
      !skills ||
      !salaryRange ||
      !location ||
      !locationType ||
      !jobType ||
      !expirationDate
    ) {
      return res
        .status(400)
        .json({ ...errorMessage, message: "All fields are required" });
    }

    console.log("s2");
    if (!salaryRange.min || !salaryRange.max) {
      return res.status(400).json({
        ...errorMessage,
        message: "Salary range must include min and max values",
      });
    }

    console.log("s3");
    console.log(req.user.id);

    const newJob = new Job({
      title,
      company: req.user.id,
      description,
      skills,
      salaryRange,
      location,
      locationType,
      jobType,
      expirationDate,
    });

    await newJob.save();
    console.log(newJob);

    return res.status(200).json({
      ...successMessage,
      message: "Job posted successfully",
      data: newJob,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ ...errorMessage, message: "Error creating new Job." });
  }
};

// read all jobs
exports.getAllJobs = async function (req, res) {
  try {
    console.log("started");
    const allJobs = await Job.find().populate("company", "userName");
    console.log(allJobs);

    return res.status(200).json({
      ...successMessage,
      message: "Jobs fetched successfully.",
      data: allJobs,
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error fetching jobs.",
    });
  }
};

// read single Job
exports.getSingleJob = async function (req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        ...errorMessage,
        message: "Please enter job id.",
      });
    }

    const jobExist = await Job.findById(id).populate(
      "company",
      "userName companyLogo"
    );

    if (!jobExist) {
      return res.status(400).json({
        ...errorMessage,
        message: "Job with this id doesn't exist.",
      });
    }

    return res.status(200).json({
      ...successMessage,
      message: "Job fetched successfully.",
      data: jobExist,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      ...errorMessage,
      message: "Error reading single job.",
    });
  }
};

// delete single job
exports.deleteJob = async function () {
  try {
    return res.status(200).json({
      ...successMessage,
      message: "Job deleted successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error deleting Job.",
    });
  }
};

// save job
exports.saveJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        ...errorMessage,
        message: "Job not found",
      });
    }

    const user = await User.findById(userId);
    if (user.savedJobs.includes(jobId)) {
      return res.status(200).json({
        ...errorMessage,
        message: "Job is already saved",
        data: "alreadySaved",
      });
    }

    user.savedJobs.push(jobId);
    await user.save();

    res.status(200).json({
      ...successMessage,
      message: "Job saved successfully!",
    });
  } catch (error) {
    res.status(400).json({
      ...errorMessage,
      message: "error while saving the job.",
    });
  }
};

// unsave a job
exports.unsaveJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        ...errorMessage,
        message: "User not found",
      });
    }

    user.savedJobs = user.savedJobs.filter(
      (savedJob) => savedJob.toString() !== jobId
    );
    await user.save();

    res.status(200).json({
      ...successMessage,
      message: "Job unsaved successfully!",
    });
  } catch (error) {
    res.status(500).json({
      ...errorMessage,
      message: " error while unsaving the job.",
    });
  }
};

// saved job lists
exports.getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "savedJobs",
      populate: { path: "company", select: "userName email" },
    });

    if (!user) {
      return res.status(400).json({
        ...errorMessage,
        message: "User not found",
      });
    }

    res.status(200).json({
      ...successMessage,
      message: "Saved jobs fetched successfully.",
      data: user.savedJobs,
    });
  } catch (error) {
    res.status(500).json({
      ...errorMessage,
      message: "Server error",
    });
  }
};

// posted Job list for company
exports.getPostedJobs = async (req, res) => {
  try {
    const companyId = req.user.id;

    const jobs = await Job.find({ company: companyId }).populate(
      "applications"
    );

    res.status(200).json({
      ...successMessage,
      message: "posted job list fetched successful.",
      data: jobs,
    });
  } catch (error) {
    res.status(400).json({
      ...errorMessage,
      message: "Error fetching the posted job list.",
    });
  }
};

// job approve by admin
exports.approveJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { approved } = req.body;

    console.log("s1");
    const jobExist = await Job.findById(jobId);

    console.log("s2");

    if (!approved) {
      return res.status(400).json({
        ...errorMessage,
        message: "please enter a valid value of approval.",
      });
    }

    if (!jobExist) {
      return res.status(400).json({
        ...errorMessage,
        message: "Job with this Id doesn't exist.",
      });
    }

    jobExist.approved = approved === "true" ? true : false;
    await jobExist.save();

    return res.status(200).json({
      ...successMessage,
      message: "Job approved successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error while approving Job.",
    });
  }
};

// landing page data: stats, featured jobs, and category counts
exports.getLandingData = async (req, res) => {
  try {
    // Count active (approved) jobs
    const activeJobsCount = await Job.countDocuments({ approved: true });

    // Count companies
    const companiesCount = await User.countDocuments({ role: "Company" });

    // Count job seekers
    const seekersCount = await User.countDocuments({ role: "Seeker" });

    // Count successful placements
    const placementsCount = await Application.countDocuments({ status: "Accepted" });

    // Category counts based on keywords matching title/skills
    const techCount = await Job.countDocuments({
      approved: true,
      $or: [
        { title: { $regex: /tech|software|developer|engineer|designer|programmer|data|ux|ui|product\s*manager|\b(it)\b|system|web|cloud|devops|fullstack|frontend|backend/i } },
        { skills: { $regex: /tech|software|developer|engineer|designer|programmer|data|ux|ui|product\s*manager|\b(it)\b|system|web|cloud|devops|fullstack|frontend|backend/i } }
      ]
    });

    const healthcareCount = await Job.countDocuments({
      approved: true,
      $or: [
        { title: { $regex: /health|doctor|nurse|clinical|hospital|medical|dentist|pharmacist|therapist|physician|surgeon|caregiver/i } },
        { skills: { $regex: /health|doctor|nurse|clinical|hospital|medical|dentist|pharmacist|therapist|physician|surgeon|caregiver/i } }
      ]
    });

    const financeCount = await Job.countDocuments({
      approved: true,
      $or: [
        { title: { $regex: /finance|bank|accountant|analyst|wealth|investment|treasury|auditor|financial|tax/i } },
        { skills: { $regex: /finance|bank|accountant|analyst|wealth|investment|treasury|auditor|financial|tax/i } }
      ]
    });

    const marketingCount = await Job.countDocuments({
      approved: true,
      $or: [
        { title: { $regex: /marketing|sales|seo|content|social|brand|advertisement|growth|\b(pr)\b|relations/i } },
        { skills: { $regex: /marketing|sales|seo|content|social|brand|advertisement|growth|\b(pr)\b|relations/i } }
      ]
    });

    // Get 3 featured (latest approved) jobs
    const featuredJobs = await Job.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("company", "userName companyLogo");

    return res.status(200).json({
      status: "Success",
      message: "Landing page data fetched successfully.",
      data: {
        stats: {
          activeJobs: activeJobsCount,
          companies: companiesCount,
          jobSeekers: seekersCount,
          successfulPlacements: placementsCount
        },
        categories: {
          technology: techCount,
          healthcare: healthcareCount,
          finance: financeCount,
          marketing: marketingCount
        },
        featuredJobs: featuredJobs
      }
    });
  } catch (error) {
    console.error("Error in getLandingData:", error);
    return res.status(500).json({
      status: "Error",
      message: "Error fetching landing page data.",
      error: error.message
    });
  }
};

