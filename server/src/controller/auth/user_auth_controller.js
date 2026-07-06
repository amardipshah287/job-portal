const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const User = require("../../model/user_model");
const Otp = require("../../model/otp_model");
const sendMail = require("../../services/send_email");

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

// send otp
exports.sendOtp = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userContact, role } = req.body;

    if (!userName || !userEmail || !userPassword || !userContact || !role) {
      return res.status(400).json({
        ...errorMessage,
        message: "Please enter all the data.",
      });
    }

    if (!userEmail) {
      return res.status(400).json({
        ...errorMessage,
        message: "Please enter all the data.",
      });
    }
    const userExist = await User.findOne({ userEmail });

    if (userExist) {
      return res.status(400).json({
        ...errorMessage,
        message: "User with this email already exist.",
      });
    }

    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    await Otp.create({
      userEmail,
      userOtp: otp,
    });

    sendMail({
      email: userEmail,
      subject: "User Register OTP -- Job Portal",
      message: `Please do not share this code.
  Sign up OTP: ${otp}`,
    });

    res.status(200).json({
      ...successMessage,
      message: "otp sent successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error while sending OTP.",
    });
  }
};

// signup
exports.userSignUp = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userContact, role, userOtp } =
      req.body;

    if (
      !userName ||
      !userEmail ||
      !userPassword ||
      !userContact ||
      !userOtp ||
      !role
    ) {
      return res.status(400).json({
        ...errorMessage,
        message: "Please enter all the data.",
      });
    }

    const userExist = await User.find({ userEmail });

    if (userExist.length > 0) {
      return res.status(400).json({
        ...errorMessage,
        message: "User already Exist.",
      });
    }

    const userWithOtp = await Otp.findOne({ userEmail });

    if (!userWithOtp) {
      return res.status(400).json({
        ...errorMessage,
        message: "no OTP sent to this user.",
      });
    }

    const isOtpMatched = userWithOtp.userOtp === userOtp;

    if (!isOtpMatched) {
      return res
        .status(400)
        .json({ ...errorMessage, message: "Please enter a valid OTP." });
    }

    const newUser = await User.create({
      userName,
      userEmail,
      userPassword: bcrypt.hashSync(
        userPassword,
        Number(process.env.HASH_SALT)
      ),
      userContact,
      role,
    });

    return res.status(200).json({
      ...successMessage,
      message: `${role} named as ${userName} created successfully.
      please login and setup your profile.`,
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error while creating user.",
    });
  }
};

// loggedIn user
exports.loggeedInUser = async (req, res) => {
  try {
    const loginUserId = req.user.id;
    const userExist = await User.findById(loginUserId).select("-password");

    if (!userExist) {
      return res.status(400).json({
        ...errorMessage,
        message: "Given token have no any user.",
      });
    }

    return res.status(200).json({
      ...successMessage,
      message: "Successful on fetching user.",
      data: userExist,
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error fetching loggedIn user.",
    });
  }
};

// login
exports.userLogIn = async (req, res) => {
  try {
    const { userEmail, userPassword, role } = req.body;

    if (!userEmail || !userPassword || !role) {
      return res.status(400).json({
        ...errorMessage,
        message: "Please provide all the data.",
      });
    }

    const userExist = await User.find({ userEmail, role });

    if (userExist.length === 0) {
      return res.status(400).json({
        ...errorMessage,
        message: "User with this credentials doens't exist.",
      });
    }

    const passwordMatched = bcrypt.compareSync(
      userPassword,
      userExist[0].userPassword
    );

    if (!passwordMatched) {
      return res.status(400).json({
        ...errorMessage,
        message: "Email or Password doesn't matched.",
      });
    }

    if (!userExist[0].approved) {
      return res.status(400).json({
        ...errorMessage,
        message: "Please request for approval.",
      });
    }

    const loggedInUser = await User.findOne({ userEmail }).select([
      "-userPassword",
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-__v",
    ]);
    const loggedInToken = jwt.sign(
      {
        id: userExist[0]._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: 60 * 60 * 8,
      }
    );

    return res
      .status(200)
      .cookie("loggedInToken", loggedInToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        ...successMessage,
        message: `${
          loggedInUser.role === "Seeker"
            ? "User"
            : loggedInUser.role === "Company"
            ? "Company"
            : "Admin"
        } Login successful.`,
        data: null,
      });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error while loggin in.",
    });
  }
};

// logout
exports.userLogOut = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("loggedInToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({
        ...successMessage,
        message: "Logged out successfully.",
      });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error while logging out",
    });
  }
};
