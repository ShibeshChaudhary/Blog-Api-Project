const bcrypt = require("bcryptjs");
const User = require("../models/User"); // <-- your Sequelize model

exports.register = async (req, res) => {
  const { name, email, password,role } = req.body;

  try {
   
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(409).json({ msg: "Email already used" });


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role:role||'user',
    });

    res.status(201).json({
      msg: "Signup successful",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
