const mongoose = require("mongoose");
const seasonSchema = mongoose.Schema(
  {
    Series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
    },
    Title: {
      type: String,
      required: "Title Name is required",
    },
    Description: {
      type: String,
    },
    Competency: {
      type: String,
    },
    LearningOutcomes: {
      type: String,
    },
    TakeAway: {
      type: String,
    },
    CompletionCriteria: {
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
const Season = mongoose.model("Season", seasonSchema);
module.exports = Season;
