const mongoose = require("mongoose");

const admitCardSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  organization: { type: String, required: true },
  examDate:     { type: Date },
  lastDate:     { type: Date },
  state:        { type: String, default: "All India" },
  qualification:{ type: String, default: "All" },
  link:         { type: String, required: true },
  postedAt:     { type: Date, default: Date.now }
});

admitCardSchema.index({ postedAt: -1 });
module.exports = mongoose.model("AdmitCard", admitCardSchema);