const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const upload = require("../middleware/multer");

router.post(
  "/register",
  upload.single("profilePicture"),
  authController.register
);

router.post("/login", authController.login);

module.exports = router;
