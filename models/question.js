const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({

  questionId: {
    type: String,
  },
  question: {
    type: String,
    required: true
  },
  published: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: null
  },
  code: {
    type: String,
    default: "Write your Code..."
  },
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  tags: [{ type: String }],
  questionsType: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    default: ""
  },
  options: [{
    option: {
      type: mongoose.Schema.Types.Mixed
    },
    mark: {
      type: Number,
      required: function () { return this.parent().questionsType !== "ntq"; }
    },
    isCorrect: {
      type: Boolean,
      required: function () { return this.parent().questionsType !== "ntq"; }
    }
  }],
  min: {
    type: Number,
    required: function () { return this.questionsType === "ntq"; }
  },
  max: {
    type: Number,
    required: function () { return this.questionsType === "ntq"; }
  }
});


const Question = mongoose.model("Question", QuestionSchema);


module.exports = { Question };
