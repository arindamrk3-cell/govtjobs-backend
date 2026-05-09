const CurrentAffair =require("../models/CurrentAffair");
const Quiz = require("../models/Quiz");
// ✅ GET ALL CURRENT AFFAIRS
exports.getCurrentAffairs =
  async (req, res) => {

    try {

      const affairs =
        await CurrentAffair.find()
          .sort({ created_at: -1 });

      res.json(affairs);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
};


// ✅ ADD CURRENT AFFAIR
exports.addCurrentAffair =
  async (req, res) => {

    try {

      const affair =
        new CurrentAffair(req.body);

      await affair.save();
      console.log("Current affair added:", affair);

      res.json({
        message:
          "Current affair added"
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
};


exports.latestUpdate=async (req, res) => {
  try {
    const latestQuiz = await Quiz.findOne().sort({ createdAt: -1 }).select("createdAt");
    const latestNews = await CurrentAffair.findOne().sort({ created_at: -1 }).select("created_at");

    const latest = [latestQuiz?.createdAt, latestNews?.created_at]
      .filter(Boolean)
      .sort((a, b) => new Date(b) - new Date(a))[0];

    res.json({ latestAt: latest || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};