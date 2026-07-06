const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../../../model/user_model");
const fs = require("fs");
const path = require("path");

const { uploadOnCLoudinary } = require("../../../config/cloudinary_config");

const errorMessage = {
  status: "Error",
  message: "Error message here",
  data: null,
};

const successMessage = {
  status: "Success",
  message: "Success message here",
  data: null,
};

// reading all users
exports.allUsers = async (req, res) => {
  try {
    const users = await User.find({ userEmail: { $ne: "admin@gmail.com" } });

    if (users.length === 0) {
      return res.status(400).json({
        ...errorMessage,
        message: "No users exist.",
      });
    }

    return res.status(200).json({
      ...successMessage,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error reading all the users.",
    });
  }
};

// reading single user
exports.singleUser = async (req, res) => {
  try {
    const id = req.params.id;

    const validId = await mongoose.Types.ObjectId.isValid(id);

    if (!validId) {
      return res.status(400).json({
        ...errorMessage,
        message: "Invalid user Id.",
      });
    }

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(400).json({
        ...errorMessage,
        message: "user with this id didn't found.",
      });
    }

    return res.status(200).json({
      ...successMessage,
      message: "User fetched successfully.",
      data: userExist,
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error reading single user.",
    });
  }
};

// updating user -- in cloudinary
// exports.updateUser = async (req, res) => {
//   try {
//     const {
//       userName,
//       userEmail,
//       userPassword,
//       userContact,
//       companyDescription,
//       userSkills,
//     } = req.body;
//     const id = req.params.id;
//     const file = req.file;
//     const filePath = req.file?.path;

//     console.log(file);
//     console.log(userName, userEmail, userPassword, userContact, userSkills, id);

//     const userExist = await User.findById(id);

//     if (!userExist) {
//       return res.status(400).json({
//         ...errorMessage,
//         message: "User with this id doesn't exist.",
//       });
//     }
//     let response;
//     if (file) {
//       if (userExist.role === "Seeker") {
//         response = await uploadOnCLoudinary(filePath, "resumes");
//       } else if (userExist.role === "Company") {
//         response = await uploadOnCLoudinary(filePath, "logos");
//       }
//       console.log(response);

//       if (!response.secure_url) {
//         return res.status(400).json({
//           ...errorMessage,
//           message: "Error on uploading resume.",
//         });
//       }
//       if (userExist.role === "Seeker") {
//         userExist.userResume = response.secure_url;
//       } else if (userExist.role === "Company") {
//         userExist.companyLogo = response.secure_url;
//       }
//     }

//     if (userName) userExist.userName = userName;
//     if (userEmail) userExist.userEmail = userEmail;
//     if (userPassword)
//       userExist.userPassword = bcrypt.hashSync(
//         userPassword,
//         Number(process.env.HASH_SALT)
//       );
//     if (userContact) userExist.userContact = userContact;
//     if (userSkills) userExist.userSkills = userSkills;
//     if (companyDescription) userExist.companyDescription = companyDescription;

//     await userExist.save();

//     return res.status(200).json({
//       ...successMessage,
//       message: `${
//         userExist.role === "Seeker" ? "User profile" : "Company profile"
//       } updated successfully.`,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({
//       ...errorMessage,
//       message: "Error while updating user.",
//     });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      userPassword,
      userContact,
      companyDescription,
      userSkills,
    } = req.body;

    const id = req.params.id;
    const file = req.file;
    const filePath = file ? `/${file.path}` : null;
    console.log(
      file,
      userName,
      userEmail,
      userPassword,
      userContact,
      userSkills,
      id
    );

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(400).json({
        ...errorMessage,
        message: "User with this ID doesn't exist.",
      });
    }

    console.log(userExist);
    console.log(userExist.role);

    if (filePath) {
      const oldFilePath =
        userExist.role === "Seeker"
          ? userExist.userResume
          : userExist.companyLogo;

      if (oldFilePath) {
        const relativeFilePath = oldFilePath.replace(
          /^http:\/\/localhost:3000\//,
          ""
        );

        const absoluteOldFilePath = path.join(
          __dirname,
          "..",
          relativeFilePath
        );

        if (
          fs.existsSync(
            absoluteOldFilePath.replace(/src\\controller\\admin\\/g, "")
          )
        ) {
          fs.unlinkSync(
            absoluteOldFilePath.replace(/src\\controller\\admin\\/g, "")
          );
          console.log("File deleted successfully:", absoluteOldFilePath);
        } else {
          console.log("File not found:", absoluteOldFilePath);
        }
      }

      console.log(`${process.env.BACKEND_URI}${filePath}`);

      if (userExist.role === "Seeker") {
        userExist.userResume = `${process.env.BACKEND_URI}${filePath}`;
      } else if (userExist.role === "Company") {
        userExist.companyLogo = `${process.env.BACKEND_URI}${filePath}`;
      }
    }

    if (userName) userExist.userName = userName;
    if (userEmail) userExist.userEmail = userEmail;
    if (userPassword) {
      userExist.userPassword = bcrypt.hashSync(
        userPassword,
        Number(process.env.HASH_SALT)
      );
    }
    if (userContact) userExist.userContact = userContact;
    if (userSkills) userExist.userSkills = userSkills;
    if (companyDescription) userExist.companyDescription = companyDescription;

    await userExist.save();

    return res.status(200).json({
      ...successMessage,
      message: `${
        userExist.role === "Seeker" ? "User profile" : "Company profile"
      } updated successfully.`,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      ...errorMessage,
      message: "Error while updating user.",
    });
  }
};

// deleting user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        ...errorMessage,
        message: "no Id found.",
      });
    }

    const userExist = await User.findById({ id });

    if (!userExist) {
      return res.status(400).json({
        ...errorMessage,
        message: "User with this id didn't found.",
      });
    }

    await User.deleteOne({ id });

    return res.status(200).json({
      ...successMessage,
      message: "User deleted successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error while deleting user.",
    });
  }
};

// approve user by admin
exports.approveUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { approved } = req.body;

    const userExist = await User.findById(userId);

    if (!approved) {
      return res.status(400).json({
        ...errorMessage,
        message: "please enter a valid value of approval.",
      });
    }

    if (!userExist) {
      return res.status(400).json({
        ...errorMessage,
        message: "User with this Id doesn't exist.",
      });
    }

    userExist.approved = approved === "true" ? true : false;
    await userExist.save();

    return res.status(200).json({
      ...successMessage,
      message: "User approved successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      ...errorMessage,
      message: "Error while approving user.",
    });
  }
};
