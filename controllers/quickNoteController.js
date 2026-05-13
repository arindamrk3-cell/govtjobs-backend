const QuickNote = require('../models/QuickNote');
exports.getQuickNotes=async (req,res)=>{
    try{
        const {category}=req.query;
        let filter={};
        if(category){
            filter.category=category;;
        }
        const notes=await QuickNote.find(filter).sort({createdAt:-1});
        res.json(notes);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
};

exports.getQuickNoteById=async (req,res)=>{
    try{
        const note=await QuickNote.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.json(note);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
};

exports.createQuickNote=async (req,res)=>{
    try{
        const {
            title,
            category,
            content,
            pdfUrl
        }=req.body;
        const note=await QuickNote.create({
            title,
            category,
            content,
            pdfUrl,
        });
        console.log("note created");
        res.status(201).json(note);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server error"});
    }
};