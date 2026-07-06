const router = require("express").Router();
const { upload } = require("../config/multer_config");
const {
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  approveUser,
} = require("../controller/admin/user/user_controller");
const { loggeedInUser } = require("../controller/auth/user_auth_controller");
const { authVerify } = require("../middleware/auth_middleware");
const { roleVerify } = require("../middleware/role_verify");

router.route("/read").get(allUsers);
router.route("/read/loginuser").get(authVerify, loggeedInUser);
router.route("/read/:id").get(authVerify, singleUser);
router
  .route("/update/:id")
  .patch(authVerify, upload.single("userResume"), updateUser);
router.route("/delete/:id").delete(deleteUser);
router
  .route("/approve/:userId")
  .patch(authVerify, roleVerify("Admin"), approveUser);

module.exports = router;
