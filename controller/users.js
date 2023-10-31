const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users Found successfully",
      isSuccess: false,
      value: users,
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "User Found successfully",
      isSuccess: true,
      value: user,
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

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
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

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password, dateOfBirth, role },
      { new: true }
    );
    res.status(200).json({
      message: "User updated successfully",
      isSuccess: true,
      value: updatedUser,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
      isSuccess: false,
      value: null,
      error: null,
    });
  }
};
