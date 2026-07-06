const Job = require("../../../model/job_model");
const Application = require("../../../model/application_model");
const sendMail = require("../../../services/send_email");

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

// apply job
exports.applyJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId, resume, coverLetter, shortlisterData } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        ...errorMessage,
        message: "Job not found",
      });
    }

    if (!resume || !coverLetter || !shortlisterData) {
      return res.status(400).json({
        ...errorMessage,
        message: "Please enter all the data.",
      });
    }

    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return res.status(400).json({
        ...errorMessage,
        message: "You have already applied for this job",
      });
    }

    const newApplication = new Application({
      jobId,
      userId,
      resume,
      coverLetter,
      shortlisterData,
    });
    await newApplication.save();

    job.applications.push(newApplication._id);
    await job.save();

    res.status(200).json({
      ...successMessage,
      message: "Job application submitted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      ...errorMessage,
      message: "Error on job application.",
    });
  }
};

// applied jobs
exports.getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ userId }).populate({
      path: "jobId",
      select: "title company location jobType",
      populate: { path: "company", select: "userName" },
    });

    res.status(200).json({
      ...successMessage,
      message: "applied job list fetched success.",
      data: applications,
    });
  } catch (error) {
    res.status(400).json({
      ...errorMessage,
      message: "Error while fetching applied job list.",
    });
  }
};

// job applicants list
exports.getJobApplicants = async (req, res) => {
  try {
    const companyId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findOne({ _id: jobId, company: companyId }).populate({
      path: "applications",
      populate: { path: "userId", select: "userName userEmail userSkills" },
    });

    if (!job) {
      return res.status(400).json({
        ...errorMessage,
        message: "Job not found or unauthorized access",
      });
    }

    res.status(200).json({
      ...successMessage,
      message: "Job applicants fetched successfully.",
      data: job.applications,
    });
  } catch (error) {
    res.status(400).json({
      ...errorMessage,
      message: "Error fetching job applicants.",
    });
  }
};

// update application status by company
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, applicantEmail } = req.body;
    const companyId = req.user.id;

    const validStatuses = ["Pending", "Shortlisted", "Accepted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        ...errorMessage,
        message: "Invalid status.",
      });
    }

    const application = await Application.findById(applicationId).populate(
      "jobId"
    );
    if (!application) {
      return res.status(400).json({
        ...errorMessage,
        message: "Application not found",
      });
    }

    if (application.jobId.company.toString() !== companyId) {
      return res.status(400).json({
        ...errorMessage,
        message: "Unauthorized to update this application",
      });
    }

    if (status !== "Pending") {
      sendMail({
        email: applicantEmail,
        subject: "You application status to the job.",
        message:
          status === "Accepted"
            ? "Congratulations! you have been accepted for the job."
            : status === "Shortlisted"
            ? "Hey! You have been shortlisted for the interview."
            : "So sorry to inform you that you have been rejected.",
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      ...successMessage,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      ...errorMessage,
      message: "Internal Server Error",
    });
  }
};

// all applications
exports.allApplications = async (req, res) => {
  try {
    const allApplications = await Application.find()
      .populate({
        path: "jobId",
        populate: { path: "company" },
      })
      .populate("userId");

    if (!allApplications) {
      return res.status(400).json({
        ...errorMessage,
        message: "No any application exist.",
      });
    }

    return res.status(200).json({
      ...successMessage,
      message: "Applicatons fetched successfullly.",
      data: allApplications,
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error fetching applicatons.",
    });
  }
};
