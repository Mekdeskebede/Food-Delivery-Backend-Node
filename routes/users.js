const express = require("express");
const router = express.Router();
const checkUserRole = require("../middleware/auth");
const userController = require("../controller/users");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/multer");

router.use(verifyToken);

router.get("/", checkUserRole, userController.getUsers);

router.get("/:id", checkUserRole, userController.getUser);

router.delete("/:id", checkUserRole, userController.deleteUser);

router.put(
  "/:id",
  checkUserRole,
  upload.single("profilePicture"),
  userController.updateUser
);

module.exports = router;
