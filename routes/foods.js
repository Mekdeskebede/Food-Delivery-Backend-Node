const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const foodController = require("../controller/food");
const checkUserRole = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.post(
  "/",
  upload.single("foodImage"),
  checkUserRole,
  foodController.addFood
);

router.get("/", foodController.getFoods);

router.get("/:id", foodController.getFood);

router.put(
  "/:id",
  checkUserRole,
  upload.single("foodImage"),
  foodController.updateFood
);

router.delete("/:id", checkUserRole, foodController.deleteFood);

module.exports = router;
