const router = require("express").Router();

const {
  initializeKhalti,
  khaltiPaymentCompletion,
  fetchAllPayments,
} = require("../controller/admin/payment/payment_controller");
const { authVerify } = require("../middleware/auth_middleware");
const { roleVerify } = require("../middleware/role_verify");

router.route("/initialize-khalti").post(authVerify, initializeKhalti);
router
  .route("/complete-khalti-payment")
  .get(authVerify, khaltiPaymentCompletion);
router.route("/all").get(authVerify, roleVerify("Admin"), fetchAllPayments);

module.exports = router;
