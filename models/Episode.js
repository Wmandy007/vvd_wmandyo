const mongoose = require("mongoose");
const episodeSchema = mongoose.Schema(
    {
        Series: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Series",
        },
        Season: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Season",
        },
        Title: {
            type: String,
            required: "Title Name is required",
        },
        Description: {
            type: String,
        },
        Completion: {
            type: String,
        },
        LearningItem: {
            type: Boolean,
        },
        Games: {
            type: Boolean,
        },
        PostAssenment: {
            type: Boolean,
        },
        Banner: {
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
    {timestamps: true}
);
const Episode = mongoose.model("Episode", episodeSchema);
module.exports = Episode;
