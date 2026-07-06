const router = require("express").Router();

const {
  applyJob,
  getAppliedJobs,
  getJobApplicants,
  updateApplicationStatus,
  allApplications,
} = require("../controller/admin/application/application_controller");

const { authVerify } = require("../middleware/auth_middleware");
const { roleVerify } = require("../middleware/role_verify");

router.route("/all").get(authVerify, roleVerify("Admin"), allApplications);
router.route("/apply").post(authVerify, applyJob);
router.route("/applied").get(authVerify, getAppliedJobs);
router
  .route("/applicants/:jobId")
  .get(authVerify, roleVerify("Company"), getJobApplicants);
router.route("/update/:applicationId").put(authVerify, updateApplicationStatus);

module.exports = router;
