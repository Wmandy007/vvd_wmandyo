const mongoose = require('mongoose');
const learningSchema = mongoose.Schema(
  {
    Series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Series',
    },
    Season: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Season',
    },
    Episode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Episode',
    },
    ListId: {
      type: String,
      required: 'Id is required',
    },
    Title: {
      type: String,
      required: 'Title Name is required',
    },
    Description: {
      type: String,
    },
    MediaType: {
      type: String,
    },
    Completion: {
      type: String,
    },
    Banner: {
      type: Array,
    },
    Media: {
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
      ref: 'User',
    },
    updatedAt: {
      type: Date,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
const Learning = mongoose.model('LearningItem', learningSchema);
module.exports = Learning;
