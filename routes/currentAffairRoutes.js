const express=require('express');
const router=express.Router();

const { getCurrentAffairs, addCurrentAffair,latestUpdate } = require('../controllers/currentAffairController');
const auth=require("../middleware/authMiddleware");
const admin=require("../middleware/adminMiddleware");

router.get("/latest", latestUpdate);
router.get("/",getCurrentAffairs);
router.post("/",auth,admin,addCurrentAffair);

module.exports=router;