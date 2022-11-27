const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtentions = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtentions);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;