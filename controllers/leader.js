const User = require('../models/User');
const Episode = require('../models/Episode');
const Quiz = require('../models/Quiz');
const Answer = require('../models/Answer');


// @route GET api/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
    const limit = req.query.limit ? req.query.limit : 100;

    const users = await User.find({Client : req.params.client})
        .select('-password').sort({score: -1}).limit(parseInt(limit))
        .populate('Client', 'fullName');


    return res.send(users);
};

exports.show = async function (req, res) {

    const episode = await Episode.findById(req.params.episode_id);
    
    const quizes = await Quiz.find({Episode: req.params.episode_id});
    const answers = await Answer.find({episode: req.params.episode_id , user: req.params.client_id});

    const correct_answers = await Answer.find({episode: req.params.episode_id , user: req.params.client_id , is_correct: { "$in": ["true",true] }});
    const wrong_answers = await Answer.find({episode: req.params.episode_id , user: req.params.client_id , is_correct: { "$in": ["false",false] }});


    return res.send({
        "quiz_total" : quizes.length,
        "answered_quiz" : answers.length,
        "correct_answers" : correct_answers,
        "wrong_answers" : wrong_answers.length,
    });
};
