const bcrypt = require("bcryptjs");
const express=require("express");
const router =express.Router();
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ msg: "Email already used" });

       const allowedRoles = [ "editor", "admin"];
    const userRole = allowedRoles.includes(role) ? role : "editor";


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    res.status(201).json({
      msg: "Signup successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
