const Answer = require("../models/Answer");
const Quiz = require("../models/Quiz");

const User = require("../models/User");
const Learning = require("../models/LearningItem");


exports.createPreAssAnswer = async (req, res, next) => {
    try {
        
        const old_answers = await Answer.find({quiz: req.body.quiz , user: req.body.user});
        if(old_answers)
            await Answer.remove({ _id: old_answers._id });
        
        let CreateQuiz = await Answer.create({
            quiz: req.body.quiz,
            user: req.body.user,
            score: req.body.point,
            assId: req.body.assId
        });

        await User.findByIdAndUpdate(
            req.body.user,
            {
                pre_ass: true
            },
            {
                new: true
            }
        );

        return res.send({
            success: true,
            message: "Answer Added Successfully",
            data: CreateQuiz,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: POST
// @Route : api/Quiz/create
// @Desc  : Handling the creation of Quiz
exports.createAnswer = async (req, res, next) => {
    try {
        
        const LearningItem = await Learning.findById(req.body.learning_item)
        
        const old_answers = await Answer.find({Episode: LearningItem.Episode , user: req.body.user , learning_item: req.body.learning_item});
        if(old_answers)
            await Answer.remove({ _id: old_answers._id });
        
        let CreateQuiz = await Answer.create({
            learning_item: req.body.learning_item,
            episode: LearningItem.Episode,
            user: req.body.user,
            type: req.body.type,
            is_correct: req.body.is_correct,
            score: 100,
        });

        await User.findByIdAndUpdate(
            req.body.user,
            {
                $inc: {
                    score: 100
                }
            },
            {new: true}
        );

        return res.send({
            success: true,
            message: "Answer Added Successfully",
            data: CreateQuiz,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: GET
// @Route : api/Quiz/
// @Desc  : Get all Quizs
exports.getAnswerByUser = async (req, res) => {
    try {
        const infographics = await Answer.find({
            user: req.params.user_id,
            type: 'infographics'
        });

        const videos = await Answer.find({
            user: req.params.user_id,
            type: 'videos'
        });

        const Document = await Answer.find({
            user: req.params.user_id,
            type: 'Document'
        });

        const comics = await Answer.find({
            user: req.params.user_id,
            type: 'comics'
        });


        res.send({success: true, data: {Document ,infographics,videos,comics }});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getPreAssAnswerByUser = async (req, res) => {
    try {
        
        const quiz = await Quiz.find({
            Client: req.params.client_id,
            QuizFor: "1"
        });

        res.send({success: true, data: {quiz }});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


exports.getPreAssAnswerByUser1 = async (req, res) => {
    try {
        
        const quiz = await Answer.find({
            user: req.params.user_id,
        })
        .populate({ 
            path: 'assId',
            populate: {
               path: 'Quiz',
               model: 'Quiz'
            } 
        });

        res.send({success: true, data: {quiz }});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


