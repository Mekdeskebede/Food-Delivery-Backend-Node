const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurant");
const upload = require("../middleware/multer");
const checkUserRole = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.post(
  "/",
  checkUserRole,
  upload.array("restaurantImages"),
  restaurantController.addRestaurant
);

router.get("/", restaurantController.getRestaurants);

router.get("/:id", restaurantController.getRestaurant);

router.put(
  "/:id",
  checkUserRole,
  upload.array("restaurantImages"),
  restaurantController.updateRestaurant
);

router.delete("/:id", checkUserRole, restaurantController.deleteRestaurant);

router.post("/:restaurantId/reviews", restaurantController.addReview);

router.get("/:restaurantId/reviews", restaurantController.getReviews);

module.exports = router;
