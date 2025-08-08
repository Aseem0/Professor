const { mongoose } = require("mongoose");

const mongoose = require("mongoose");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  //   createdBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User", // reference to User model
  //     required: true,
  //   },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      choices: [
        {
          label: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
        },
      ],
      correctAnswer: {
        type: String,
        required: true,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to User model
    required: true,
  },
});

const QuestionSet = mongoose.model("QuestionSet", QuestionSetSchema);
module.exports = QuestionSet;
