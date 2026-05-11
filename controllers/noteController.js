const Note= require("../models/Note");


// ─────────────────────────────────────────────
// GET all notes
// ─────────────────────────────────────────────
exports.getNotes = async (req, res) => {
  try {

    const { category, subject } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (subject) {
      filter.subject = subject;
    }

    const notes = await Note.find(filter)
      .sort({ createdAt: -1 });

    res.json(notes);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// ─────────────────────────────────────────────
// GET single note
// ─────────────────────────────────────────────
exports.getSingleNote = async (req, res) => {
  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.json(note);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// ─────────────────────────────────────────────
// CREATE note
// ─────────────────────────────────────────────
exports.createNote = async (req, res) => {
  try {

    const {
      title,
      category,
      subject,
      description,
      pdfUrl,
      thumbnail,
      pages,
      language,
      premium
    } = req.body;

    const note = new Note({
      title,
      category,
      subject,
      description,
      pdfUrl,
      thumbnail,
      pages,
      language,
      premium,
    });

    await note.save();

    res.status(201).json(note);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// ─────────────────────────────────────────────
// DELETE note
// ─────────────────────────────────────────────
exports.deleteNote = async (req, res) => {
  try {

    await Note.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note deleted"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
};