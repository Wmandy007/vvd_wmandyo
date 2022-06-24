const { Schema, model } = require('mongoose');

const pairSchema = new Schema(
  {
    aFile: String,
    aText: String,
    bFile: String,
    bText: String,
    points: {
      type: Number,
      required: true,
    },
    lightUpGameId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      default: '61be1bf515402364e6b913b8',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const gameSchema = new Schema(
  {
    description: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      default: '61be1bf515402364e6b913b8',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    pair: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LightItUpGamePair',
      },
    ],
  },
  { timestamps: true }
);

const LightItUpGame = model('LightItUpGame', gameSchema);
const LightGamePair = model('LightItUpGamePair', pairSchema);

module.exports = { LightItUpGame, LightGamePair };
