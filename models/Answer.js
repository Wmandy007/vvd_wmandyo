const mongoose = require("mongoose");
const quizSchema = mongoose.Schema(
    {
        learning_item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "learningitems",
        },
        episode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "episodes",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quizzes',
        },
        assId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assessment',
        },
        type: {
            type: String,
        },
        score: {
            type: Number,
            default: 0
        },
        is_correct: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {timestamps: true}
);
const Answer = mongoose.model("answer", quizSchema);
module.exports = Answer;
