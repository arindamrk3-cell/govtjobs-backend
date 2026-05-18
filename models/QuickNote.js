const mongoose = require("mongoose");
const blockSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [
            "heading",
            "text",
            "bullet",
            "important",
            "formula",
        ],
        required: true
    },
    text: {
        type: String,
        required: true
    },

});
const quickNoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: "General"
    },
    pdfUrl: {
        type: String,
        default: "",
    },
    content: [blockSchema],

}, { timestamps: true, });
module.exports = mongoose.model("QuickNote", quickNoteSchema);