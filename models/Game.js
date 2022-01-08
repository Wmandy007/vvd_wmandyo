const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
        gameType: String,
        selectedGame: String,
        description: {
            type: String,
        },
        banner: {
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
