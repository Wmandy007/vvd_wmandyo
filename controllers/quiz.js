const Quiz = require("../models/Quiz");

// @Method: POST
// @Route : api/Quiz/create
// @Desc  : Handling the creation of Quiz
exports.createQuiz = async (req, res, next) => {
    try {
        const {
            Client,
            Series,
            Season,
            Episode,
            LeaningItem,
            QuizFor,
            max_time,
            point,
            Title,
            Description,
            Option1,
            Option2,
            Option3,
            Option4,
            CorrectOption,
            Status,
        } = req.body;
        if (!Title || !Status) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields.",
            });
        }
        if (req.imageArr && req.imageArr.length > 1) {
            return res.status(400).json({
                Message: "you can insert only One image",
            });
        }
        let dupQuiz = await Quiz.findOne({Title});
        if (dupQuiz) {
            return res
                .status(400)
                .json({success: false, message: "Quiz already exists"});
        }
        
        let CreateQuiz = '';
        if(QuizFor == 0){
            //main quiz
            CreateQuiz = await Quiz.create({
                Series,
                Season,
                Episode,
                LeaningItem,
                QuizFor,
                point,
                Title,
                Description,
                Option1,
                Option2,
                Option3,
                Option4,
                CorrectOption,
                Banner: req.imageArr,
                Status,
            });
            
        } else if(QuizFor == 1){
             //pre assesment quiz
             CreateQuiz = await Quiz.create({
                Client,    
                QuizFor,
                max_time,
                point,
                Title,
                Description,
                Option1,
                Option2,
                Option3,
                Option4,
                CorrectOption,
                Banner: req.imageArr,
                Status,
            });
            
        } else if(QuizFor == 2){
            //post assesment quiz
             
            
        } else {
             //pre assesment quiz
             CreateQuiz = await Quiz.create({
                Client,    
                QuizFor,
                max_time,
                point,
                Title,
                Description,
                Option1,
                Option2,
                Option3,
                Option4,
                CorrectOption,
                Banner: req.imageArr,
                Status,
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Quiz Added Sucessfully",
            data: CreateQuiz,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: GET
// @Route : api/Quiz/
// @Desc  : Get all Quizs
exports.getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.find();
        res.status(200).json({success: true, data: quiz});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: GET
// @Route : api/Quiz/:id
// @Desc  : Get Quiz by id
exports.getQuizById = async (req, res) => {
    try {
        let id = req.params.id;
        const quiz = await Quiz.findById(id);
        res.status(200).json({success: true, data: quiz});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: GET
// @Route : api/Quiz/:id
// @Desc  : Get Quiz by id
exports.getQuizByLearningItemId = async (req, res) => {
    try {
        let id = req.params.id;
        const quiz = await Quiz.find({LeaningItem: id});
        res.status(200).json({success: true, data: quiz});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: DELETE
// @Route : api/Quiz/:id
// @Desc  : Delete Quiz by id
exports.removeQuiz = async (req, res) => {
    try {
        let id = req.params.id;
        const removeQuiz = await Quiz.remove({_id: id});
        res.status(200).json({
            success: true,
            message: "Quiz Deleted Successfully",
            data: removeQuiz,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: PATCH
// @Route : api/Quiz/:id
// @Desc  : Handling the updation of Quiz
exports.updateQuiz = async (req, res, next) => {
    try {
        const {
            Series,
            Season,
            Episode,
            LeaningItem,
            QuizFor,
            Title,
            Description,
            Option1,
            Option2,
            Option3,
            Option4,
            CorrectOption,
            Status,
        } = req.body;
        const id = req.params.id;
        if (!Title || !Status || !id) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields.",
            });
        }
        if (req.imageArr) {
            if (req.imageArr.length > 1) {
                return res.status(400).json({
                    Message: "you can insert only One image for banner",
                });
            } else {
                const updatedQuiz = await Quiz.updateOne(
                    {_id: id},
                    {
                        $set: {
                            Series: Series,
                            Season: Season,
                            Episode: Episode,
                            LeaningItem: LeaningItem,
                            QuizFor: QuizFor,
                            Title: Title,
                            Description: Description,
                            LeaningItem: LeaningItem,
                            Option1: Option1,
                            Option2: Option2,
                            Option3: Option3,
                            Option4: Option4,
                            CorrectOption: CorrectOption,
                            Banner: req.imageArr,
                            Status: Status,
                        },
                    }
                );
                res.status(200).json({
                    success: true,
                    message: "Quiz Updated Successfully",
                    data: updatedQuiz,
                });
            }
        } else {
            const updatedQuiz = await Quiz.updateOne(
                {_id: id},
                {
                    $set: {
                        Series: Series,
                        Season: Season,
                        Episode: Episode,
                        LeaningItem: LeaningItem,
                        QuizFor: QuizFor,
                        Title: Title,
                        Description: Description,
                        LeaningItem: LeaningItem,
                        Option1: Option1,
                        Option2: Option2,
                        Option3: Option3,
                        Option4: Option4,
                        CorrectOption: CorrectOption,
                        Status: Status,
                    },
                }
            );
            res.status(200).json({
                success: true,
                message: "Quiz Updated Successfully",
                data: updatedQuiz,
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
