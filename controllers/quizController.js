const Quiz =
  require("../models/Quiz");


// GET QUIZZES
exports.getQuizzes =
  async (req, res) => {

    try {

      const quizzes =
        await Quiz.find()
          .sort({ date: -1 });

      res.json(quizzes);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
};


// ADD QUIZ
exports.addQuiz =
  async (req, res) => {

    try {

      const quiz =
        new Quiz(req.body);

      await quiz.save();

      res.json({
        message:
          "Quiz added"
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
};