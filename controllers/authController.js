const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed
    });

    await user.save();

    res.json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.savePushToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({error:"User not found"});
    user.pushToken = req.body.pushToken;
    await user.save();
    res.json({ message: "Push Token Saved" });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.savePreferences = async (req, res) => {
  try {
    const { state, qualification } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.state = state;
    user.qualification = qualification;
    await user.save();
    res.json({ message: "preferences saved" });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
};