const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.logout = (req, res) => {
  try {
    res.status(200).json({
      message: "Logout successful. Please remove token from client.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error: error.message
    });
  }
};
