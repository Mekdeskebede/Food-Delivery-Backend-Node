const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const Food = require("../models/food");
const User = require("../models/user");
const transporter = require("../middleware/nodemailer");
const validator = require("validator");

exports.getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    res.status(200).json({
      message: "Order found successfully",
      value: order,
      isSuccess: true,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      isSuccess: false,
      value: null,
      error: null,
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      message: "Orders found successfully",
      isSuccess: true,
      value: orders,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      isSuccess: false,
      value: null,
      error: null,
    });
  }
};

exports.order = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const { userId, items, status } = req.body;

    // Check if the restaurant and food exist
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
        isSuccess: false,
        value: null,
        error: null,
      });
    }
    let totalPrice = 0;
    for (const item of items) {
      const { food, quantity } = item;

      const currFood = await Food.findById(food);

      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }

      const itemTotalPrice = currFood.price * quantity;
      totalPrice += itemTotalPrice;
    }
    // Create the order and add it to the user's order history
    const order = new Order({
      userId,
      items,
      restaurantId,
      status,
      totalPrice,
    });
    order.save();
    console.log(req.user, "######### this the user");
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        isSuccess: false,
        value: null,
        error: null,
      });
    }
    user.orderHistory.push(order._id);
    await user.save();

    if (!validator.isEmail(restaurant.ownerEmail)) {
      console.error("Invalid email address");
    } else {
      const mailOptions = {
        from: "kebedemekdes289@gmail.com", // Sender's email address
        to: restaurant.ownerEmail, // Recipient's email address
        subject: "New Food Order", // Subject of the email
        text: ` 
        You have a new food order. 
        Ordered by: ${user.name},
        Email: ${user.email},
        Check your dashboard for more details. `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    res.status(201).json({
      message: "Order placed successfully",
      isSuccess: true,
      value: order,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      isSuccess: false,
      value: null,
      error: null,
    });
  }
};
