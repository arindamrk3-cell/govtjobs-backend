const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  organization: { type: String, required: true },
  resultDate:   { type: Date },
  state:        { type: String, default: "All India" },
  qualification:{ type: String, default: "All" },
  link:         { type: String, required: true },
  postedAt:     { type: Date, default: Date.now }
});

resultSchema.index({ postedAt: -1 });
module.exports = mongoose.model("Result", resultSchema);