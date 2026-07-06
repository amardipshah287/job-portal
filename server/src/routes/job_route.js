const router = require("express").Router();

const {
  createJob,
  getAllJobs,
  getSingleJob,
  saveJob,
  unsaveJob,
  getSavedJobs,
  getPostedJobs,
  approveJob,
  getLandingData,
} = require("../controller/admin/job/job_controller");
const { authVerify } = require("../middleware/auth_middleware");
const { roleVerify } = require("../middleware/role_verify");

router.route("/create").post(authVerify, roleVerify("Company"), createJob);
router.route("/getalljob").get(getAllJobs);
router.route("/getlandingdata").get(getLandingData);
router.route("/getsinglejob/:id").get(getSingleJob);
router.route("/save").post(authVerify, saveJob);
router.route("/unsave").post(authVerify, unsaveJob);
router.route("/saved").get(authVerify, getSavedJobs);
router.route("/posted").get(authVerify, getPostedJobs);
router.route("/approve/:jobId").patch(authVerify, approveJob);

module.exports = router;
