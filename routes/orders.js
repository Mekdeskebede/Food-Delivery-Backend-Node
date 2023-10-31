const express = require("express");
const router = express.Router();
const checkUserRole = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const orderController = require("../controller/order");

router.use(verifyToken);

router.post("/:restaurantId", orderController.order);

router.get("/", checkUserRole, orderController.getOrders);

router.get("/:id", orderController.getOrder);

module.exports = router;
