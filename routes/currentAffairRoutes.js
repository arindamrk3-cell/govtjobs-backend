const express=require('express');
const router=express.Router();

const { getCurrentAffairs, addCurrentAffair } = require('../controllers/currentAffairController');
const auth=require("../middleware/authMiddleware");
const admin=require("../middleware/adminMiddleware");

router.get("/",getCurrentAffairs);
router.post("/",auth,admin,addCurrentAffair);

module.exports=router;