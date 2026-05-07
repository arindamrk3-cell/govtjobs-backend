const express = require("express");
const router = express.Router();

const {
  getJobs,
  //addJob,
  searchJobs,
  bookmarkJob,
  removeBookmark,
  getBookmarks,
  getCategories,
  getForYou,
  applyJob,
  removeAppliedJob,
  updateApplyStatus,
  getAppliedJobs,
  getCalendarJobs,
  getUpcomingExams,
  
} = require("../controllers/jobController");
const admin=require("../middleware/adminMiddleware");

const auth = require("../middleware/authMiddleware");




router.get("/foryou", auth, getForYou); 
router.get("/search", searchJobs);
router.get("/bookmarks", auth, getBookmarks);
router.get("/applied",auth,getAppliedJobs);
router.get("/categories", getCategories);
router.get("/", getJobs);


router.post("/bookmark/:jobId", auth, bookmarkJob);
router.delete("/bookmark/:jobId", auth, removeBookmark);
router.post("/apply/:jobId", auth, applyJob);      // NEW
router.delete("/apply/:jobId", auth, removeAppliedJob);
router.patch("/apply/:jobId/status", auth, updateApplyStatus); // NEW
router.get("/calendar", getCalendarJobs); // ← add this
router.get("/upcoming-exams", getUpcomingExams);
module.exports = router;