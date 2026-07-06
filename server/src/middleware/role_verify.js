const User = require("../model/user_model");

exports.roleVerify = (role) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (user.role !== role && user.role !== "Admin") {
      return res.status(400).json({
        status: "Error",
        message: `Access denied. Only ${role}'s can perform this action.`,
        data: null,
      });
    }
    next();
  };
};
