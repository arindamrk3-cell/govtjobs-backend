const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    pages: {
      type: Number,
      default: 0,
    },

    language: {
      type: String,
      default: "English",
    },

    premium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);