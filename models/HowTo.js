const mongoose = require("mongoose");
const episodeSchema = mongoose.Schema(
    {
        Episode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Episode",
        },
        Series: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Series",
        }, 
        Season: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Season",
        },
        Client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        },
        Title: {
            type: String,
            required: "Title is required",
        },
        Description: {
            type: String,
            required: "Title is required",
        },
        DescriptionNot: {
            type: String,
            required: "Title is required",
        },
        Image: [{
            type: String,
            required: "Image is required",
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
        },
    },
    {timestamps: true}
);
const Game = mongoose.model("HowTo", episodeSchema);
module.exports = Game;