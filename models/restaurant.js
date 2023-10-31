const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  restaurantImages: {
    type: [String], // This will store an array of image URLs
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  contact: {
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  reviews: [
    {
      author: {
        type: String,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
      },
    },
  ],

  ownerEmail: {
    type: String,
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
