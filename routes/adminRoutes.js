const express=require("express");
const router=express.Router();
const {
    getStats,
    getUsers,
    updateJob,
    deleteJob,
    searchUsers,
    getAllJobsAdmin,
    deleteUser
    
}=require("../controllers/adminController");

const {addJob}=require("../controllers/jobController");
const auth=require("../middleware/authMiddleware");
const admin=require("../middleware/adminMiddleware");

router.get("/stats",auth,admin,getStats);
router.get("/users",auth,admin,getUsers);
router.delete("/users/:id",auth,admin,deleteUser);
router.get("/users/search",auth,admin,searchUsers);
router.post("/jobs/add",auth,admin,addJob);
router.get("/jobs",auth,admin,getAllJobsAdmin);
router.put("/jobs/:id",auth,admin,updateJob);
router.delete("/jobs/:id",auth,admin,deleteJob);

const {
    addAdmitCard, deleteAdmitCard,
    addResult, deleteResult,
    getAdmitCards, getResults
} = require("../controllers/admitCardController");
router.get("/admit-cards",         auth, admin, getAdmitCards);
router.post("/admit-cards/add",    auth, admin, addAdmitCard);
router.delete("/admit-cards/:id",  auth, admin, deleteAdmitCard);
router.get("/results",             auth, admin, getResults);
router.post("/results/add",        auth, admin, addResult);
router.delete("/results/:id",      auth, admin, deleteResult);

module.exports=router;
