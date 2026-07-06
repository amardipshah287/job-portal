const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCLoudinary = async (filepath, folder) => {
  try {
    const uploaded = await cloudinary.uploader.upload(filepath, {
      resource_type: "raw",
      use_filename: true,
      folder: folder,
      allowed_formats: ["jpg", "png", "pdf", "jpeg"],
    });

    try {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    } catch (err) {
      return res.status(400).json({
        status: "Error",
        message: "Error on deleting image from local server.",
      });
    }

    return uploaded;
  } catch (err) {
    console.error("Cloudinary Upload Error: ", err);
    fs.unlinkSync(filepath);
    return null;
  }
};

module.exports = { uploadOnCLoudinary };
