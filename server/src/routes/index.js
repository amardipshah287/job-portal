const router = require("express").Router();

const authRoute = require("./auth_route");
const userRoute = require("./user_route");
const jobRoute = require("./job_route");
const applicationRoute = require("./application_route");
const paymnetRoute = require("./payment_route");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/job", jobRoute);
router.use("/application", applicationRoute);
router.use("/payment", paymnetRoute);

module.exports = router;
