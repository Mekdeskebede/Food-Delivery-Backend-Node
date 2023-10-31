const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String], // Assuming an array of ingredients
    required: true,
  },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
  foodImage: {
    type: String, // This will store the image filename or URL
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
