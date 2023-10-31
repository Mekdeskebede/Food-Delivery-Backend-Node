require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

exports.register = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, role } = req.body;
    await cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        res.status(500).json({ message: "upload faild" });
      } else {
        profilePicture = result;
      }
    });
    const user = new User({
      name,
      email,
      password,
      dateOfBirth: new Date(dateOfBirth),
      role,
      profilePicture,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const payload = { sub: user._id };
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN);

    res.json({ message: "Login successful", accessToken });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
