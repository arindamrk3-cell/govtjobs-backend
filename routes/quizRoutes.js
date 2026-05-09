const express =
  require("express");

const router =
  express.Router();

const {
  getQuizzes,
  addQuiz
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


// ADD QUIZ
router.post(
  "/",
  auth,
  admin,
  addQuiz
);

module.exports = router;