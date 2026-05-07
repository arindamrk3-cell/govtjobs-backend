const AdmitCard = require("../models/AdmitCard");
const Result    = require("../models/Result");

// ── Admit Cards ──────────────────────────────────────────────────────────────

exports.getAdmitCards = async (req, res) => {
  try {
    const { state, qualification } = req.query;
    let filter = {};
    if (state)         filter.state         = state;
    if (qualification) filter.qualification = qualification;

    const cards = await AdmitCard.find(filter).sort({ postedAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addAdmitCard = async (req, res) => {
  try {
    const card = new AdmitCard(req.body);
    await card.save();
    res.json({ message: "Admit card added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAdmitCard = async (req, res) => {
  try {
    await AdmitCard.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ── Results ──────────────────────────────────────────────────────────────────

exports.getResults = async (req, res) => {
  try {
    const { state, qualification } = req.query;
    let filter = {};
    if (state)         filter.state         = state;
    if (qualification) filter.qualification = qualification;

    const results = await Result.find(filter).sort({ postedAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.json({ message: "Result added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};