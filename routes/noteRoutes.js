const express = require("express");
const router = express.Router();

const {
  getNotes,
  getSingleNote,
  createNote,
  deleteNote,
  
} = require("../controllers/noteController");
const admin=require("../middleware/adminMiddleware");

const auth = require("../middleware/authMiddleware");


router.get("/", getNotes);

router.get("/:id", getSingleNote);

router.post("/", auth,admin, createNote);

router.delete("/:id", auth,admin, deleteNote);

module.exports = router;