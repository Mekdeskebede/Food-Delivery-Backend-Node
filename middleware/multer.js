const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(req, "the reqq");
    // console.log(file, "the filee");
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// const fileFilter = (req, res, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported file format" }, false);
//   }
// };
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1024 * 1024 },
  // fileFilter: fileFilter,
});
module.exports = upload;
