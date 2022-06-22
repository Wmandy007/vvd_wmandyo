const { Schema, model } = require('mongoose');

const levelSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      require: true,
    },
    selectedGame: {
      type: String,
      require: true,
    },
    totalPoints: {
      type: Number,
      require: true,
    },
    level: {
      type: Number,
      require: true,
    },
    passPoints: {
      type: Number,
      require: true,
    },
    maxAttempt: {
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
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
  },
  { timestamps: true }
);

const Level = model('Level', levelSchema);
module.exports = Level;
