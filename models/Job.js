const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: String,
  qualification: String,
  state: String,
  last_date: Date,
  examDate:     { type: Date, default: null },

  link: { type: String, unique: true },

  tags: [String],

  verified: {
    type: Boolean,
    default: true
  },

  source: String,

  created_at: {
    type: Date,
    default: Date.now
  },
  vacancies:        { type: Number, default: null },
  salary:           { type: String, default: null },
  ageLimit:         { type: String, default: null },
  eligibility:      { type: String, default: null },
  selectionProcess: { type: String, default: null },
  applicationFee:   { type: String, default: null },
});

jobSchema.index({ created_at: -1 });
jobSchema.index({ title: "text" });

module.exports = mongoose.model("Job", jobSchema);