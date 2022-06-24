const mongoose = require("mongoose");
const quizSchema = mongoose.Schema(
  {
    Series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
    },
    Season: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
    },
    Episode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
    },
    LeaningItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningItem",
    },
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    QuizFor: {
      type: String,
    },
    max_time: {
      type: String,
    },
    point: {
      type: String,
    },
    Title: {
      type: String,
      required: "Title Name is required",
    },
    Description: {
      type: String,
    },
    Option1: {
      type: String,
    },
    Option2: {
      type: String,
    },
    Option3: {
      type: String,
    },
    Option4: {
      type: String,
    },
    CorrectOption: {
      type: String,
    },
    Banner: {
      type: Array,
    },
    Status: {
      type: Boolean,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
