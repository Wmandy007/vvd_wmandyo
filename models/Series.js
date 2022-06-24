const mongoose = require("mongoose");
const seriesSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: "Title Name is required",
    },
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
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
    Dictionary: {
      type: String,
    },
    DictionaryDescription: {
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
    Series_type: {
      type: String,
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
const Series = mongoose.model("Series", seriesSchema);
module.exports = Series;