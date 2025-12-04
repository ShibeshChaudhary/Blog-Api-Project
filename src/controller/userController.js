const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({ DATA: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user)
      return res.status(404).json({ msg: "User not found" });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error("Error getting profile:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Delete failed' });
  }
};