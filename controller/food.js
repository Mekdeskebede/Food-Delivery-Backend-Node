const Food = require("../models/food");
const cloudinary = require("../utils/cloudinary");
const Restaurant = require("../models/restaurant");

exports.addFood = async (req, res) => {
  try {
    const { restaurantId, name, description, ingredients, price } = req.body;
    await cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "upload faild" });
      } else {
        foodImage = result.secure_url;
      }
    });
    const food = new Food({
      name,
      ingredients,
      description,
      price,
      foodImage,
    });
    await food.save();
    const restaurant = await Restaurant.findById(restaurantId);

    restaurant.menu.push(food._id);
    await restaurant.save();

    res.status(201).json({
      message: "Food created successfully",
      isSuccess: true,
      value: food,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      isSuccess: true,
      value: null,
      error: null,
    });
  }
};

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({
      message: "Foods found successfully",
      isSuccess: true,
      value: foods,
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

exports.getFood = async (req, res) => {
  try {
    const id = req.params.id;
    const food = await Food.findById(id);
    res.status(200).json({
      message: "Food found successfully",
      isSuccess: true,
      value: food,
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

exports.updateFood = async (req, res) => {
  try {
    const { name, ingredients, description, price } = req.body;
    await cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "upload faild" });
      } else {
        foodImage = result.secure_url;
      }
    });
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { name, ingredients, description, price, foodImage },
      { new: true }
    );
    res.status(200).json({
      message: "Food updated successfully",
      isSuccess: true,
      value: updatedFood,
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

exports.deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;

    // Find the food item by ID
    const food = await Food.findById(foodId);

    // Find the restaurant associated with this food
    const restaurant = await Restaurant.findOne({ menu: foodId });
    restaurant.menu.pull(foodId);
    await restaurant.save();
    await Food.findByIdAndRemove(foodId);
    res.status(200).json({
      message: "Food deleted successfully",
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
