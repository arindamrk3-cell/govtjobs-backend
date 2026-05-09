const CurrentAffair =
  require("../models/CurrentAffair");


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