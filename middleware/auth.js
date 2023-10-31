require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const checkUserRole = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        isSuccess: false,
        value: null,
        error: null,
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    // Fetch the user's role from the database
    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user information to the request object
    req.user = user;

    // Check the user's role and grant/deny access based on roles
    if (user.role === "admin") {
      // This user is an admin, allow access
      next();
    } else {
      // User doesn't have the required role
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
        isSuccess: false,
        value: null,
        error: null,
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
      isSuccess: false,
      value: null,
      error: null,
    });
  }
};

module.exports = checkUserRole;
