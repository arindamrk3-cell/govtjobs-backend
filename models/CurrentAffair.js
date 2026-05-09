const mongoose = require("mongoose");

const currentAffairSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "General"
  },

  image: {
    type: String,
    default: ""
  },

  importantPoints: [{
    type: String
  }],

  date: {
    type: Date,
    default: Date.now
  },

  created_at: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports =
  mongoose.model(
    "CurrentAffair",
    currentAffairSchema
  );