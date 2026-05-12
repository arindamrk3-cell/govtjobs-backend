const express =
  require("express");

const router =
  express.Router();

const {
  getQuizzes,
  addQuiz,
  getDailyQuiz
} = require(
  "../controllers/quizController"
);

const auth =
  require("../middleware/authMiddleware");

const admin =
  require("../middleware/adminMiddleware");


// GET QUIZZES
router.get(
  "/",
  getQuizzes
);
router.get("/daily",getDailyQuiz);

// ADD QUIZ
router.post(
  "/",
  auth,
  admin,
  addQuiz
);

module.exports = router;