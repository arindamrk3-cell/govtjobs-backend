const User = require("../models/User");

// GET /user/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);

    console.log(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /user/preferences
exports.updatePreferences = async (req, res) => {
  try {
    const { state, qualification, pushToken } = req.body;

    const update = {};
    if (state) update.state = state;
    if (qualification) update.qualification = qualification;
    if (pushToken) update.pushToken = pushToken;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: update },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};