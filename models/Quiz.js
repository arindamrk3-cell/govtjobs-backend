const mongoose=require("mongoose");
const quizSchema=new mongoose.Schema({
    question: {
      type: String,
      required: true
    },

    options: [{
      type: String
    }],

    answer: {
      type: String,
      required: true
    },

    explanation: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      default: "General"
    },

    date: {
      type: Date,
      default: Date.now
    }
},  { timestamps: true });
module.exports=mongoose.model("Quiz",quizSchema);