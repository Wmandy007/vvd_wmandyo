const { Schema, model } = require('mongoose');

const questionSchema = new Schema(
  {
    level: {
      type: Schema.Types.ObjectId,
      ref: 'Level',
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
    correctAnswer: {
      type: String,
      require: true,
    },
    incorrectAnswer: {
      type: String,
      require: true,
    },
    correctPoint: {
      type: Number,
      require: true,
    },
    incorrectPoint: {
      type: Number,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Question = model('Question', questionSchema);
module.exports = Question;
