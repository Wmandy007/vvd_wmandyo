const mongoose = require("mongoose");
const seriesSchema = mongoose.Schema(
  {
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    Quiz: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
    }],
    Banner: {
      type: Array,
    },
    Status: {
      type: Boolean,
    },
    assId: {
        type: String,   
    },
    Name: {
      type: String,
    },
    
    Type: {
      type: String,
    },
    Time: {
      type: String,
    },
    Point: {
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
const Assessment = mongoose.model("Assessment", seriesSchema);
module.exports = Assessment;