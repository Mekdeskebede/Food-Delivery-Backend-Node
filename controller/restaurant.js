const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const cloudinary = require("../utils/cloudinary");
const Food = require("../models/food");
const User = require("../models/user");

exports.addRestaurant = async (req, res) => {
  try {
    const { name, location, description, menu, contact, reviews, ownerEmail } =
      req.body;

    const imageUrls = [];
    // Upload restaurant images to Cloudinary
    for (const file of req.files) {
      await cloudinary.uploader.upload(file.path, (err, result) => {
        if (err) {
          res.status(500).json({ message: "upload faild" });
        } else {
          imageUrls.push(result.secure_url);
        }
      });
    }
    const owner = await User.findOne({ email: ownerEmail });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    const restaurant = new Restaurant({
      name,
      location,
      description,
      menu,
      contact,
      reviews,
      restaurantImages: imageUrls,
      ownerEmail:owner.email,
    });

    // Save the restaurant to the database
    await restaurant.save();

    res.status(201).json({
      message: "Restaurant created successfully",
      isSuccess: true,
      value: restaurant,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the restaurant",
      isSuccess: False,
      value: null,
      error: null,
    });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      message: "Restaurants found successfully",
      isSuccess: true,
      value: restaurants,
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

exports.getRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);
    res.status(200).json({
      message: "Restaurant found successfully",
      isSuccess: true,
      value: restaurant,
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

exports.updateRestaurant = async (req, res) => {
  try {
    const { name, location, description, menu, contact, reviews, ownerEmail } =
      req.body;
    for (const file of req.files) {
      console.log(file, "file");
      await cloudinary.uploader.upload(file.path, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "upload faild" });
        } else {
          console.log(result, "image res");
          imageUrls.push(result.secure_url);
        }
      });
    }
    const owner = await User.findOne({ email: ownerEmail });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        description,
        menu,
        contact,
        reviews,
        restaurantImages: imageUrls,
        ownerEmail:owner.email,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Restaurant updated successfully",
      isSuccess: true,
      value: updatedRestaurant,
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

exports.deleteRestaurant = async (req, res) => {
  try {
    await Restaurant.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "Restaurant deleted successfully",
      isSuccess: true,
      value: null,
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

exports.addReview = async (req, res) => {
  try {
    const { author, rating, comment } = req.body;
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.reviews.push({ author, rating, comment });
    await restaurant.save();

    res.status(201).json({ message: "Review added successfully", restaurant });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ reviews: restaurant.reviews });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
