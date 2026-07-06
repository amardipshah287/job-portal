const jwt = require("jsonwebtoken");
const User = require("../model/user_model");

exports.authVerify = async (req, res, next) => {
  const token = req.cookies.loggedInToken;
  if (!token) {
    return res.status(400).json({
      status: "Error",
      message: "Please login to continue further.",
      data: null,
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.user = decodedToken;
    const user = await User.findById(req.user.id);

    console.log(user);
    req.user.role = user.role;

    next();
  } catch (err) {
    return res.status(400).json({
      status: "Error",
      message: "Invalid or expired token!",
      data: null,
    });
  }
};
