const mongoose = require('mongoose');
const episodeSchema = mongoose.Schema(
  {
    Episode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Episode',
    },
    Series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Series',
    },
    Season: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Season',
    },
    Client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    Name: {
      type: String,
      required: 'Title Name is required',
    },
    Banner: {
      type: Array,
    },
    Url: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);
const Game = mongoose.model('Game-banner', episodeSchema);
module.exports = Game;
