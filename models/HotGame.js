const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
  {
    gameType: String,
    selectedGame: String,
    description: {
      type: String,
    },
    situationTitle: {
      type: String,
    },
    banner: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    youImage: {
      type: String,
    },
    youCommentText: {
      type: String,
    },
    characterImage: {
      type: String,
    },
    commentBoxText: {
      type: String,
    },
    options: [
      {
        name: String,
        answerType: Number,
        reason: String,
        points: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Game', gameSchema);
