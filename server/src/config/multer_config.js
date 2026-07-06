const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath =
      req.user.role === "Seeker" ? "public/resumes" : "public/logos";
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const id = req.user.id;
    const fileExt = path.extname(file.originalname);
    const fileName = `${id}-${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });
module.exports = { upload };
