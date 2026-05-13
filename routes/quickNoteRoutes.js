const express = require('express'); 
const router = express.Router();
//const quickNoteController=require("../controllers/quickNoteController");
const {
    getQuickNotes,
    getQuickNoteById,
    createQuickNote
}=require("../controllers/quickNoteController");
const auth=require("../controllers/authController");
const admin=require("../controllers/adminController");
router.get("/",getQuickNotes);
router.get("/:id",getQuickNoteById);
router.post("/",createQuickNote);

module.exports=router;