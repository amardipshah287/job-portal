const router = require("express").Router();
const passport = require("passport");
const {
  userSignUp,
  userLogIn,
  sendOtp,
  userLogOut,
} = require("../controller/auth/user_auth_controller");

router.route("/signup").post(userSignUp);
router.route("/signup/otp").post(sendOtp);
router.route("/login").post(userLogIn);
router.route("/logout").post(userLogOut);

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);

router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/",
  }),
  (req, res) => {
    const { role, loggedInToken } = req.user;

    console.log(1);
    console.log(req.user);
    console.log(loggedInToken);
    res.cookie("loggedInToken", loggedInToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    if (role === "Seeker") {
      res.redirect("http://localhost:5173/");
    } else {
      res.redirect("http://localhost:5173/dashboard/provider");
    }
  }
);

module.exports = router;
