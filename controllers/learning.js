const Learning = require('../models/LearningItem');
const {randomBytes} = require('crypto');

// @Method: POST
// @Route : api/Learning/create
// @Desc  : Handling the creation of Learning
exports.createLearning = async (req, res, next) => {
    try {
        const {
            Series,
            Season,
            Episode,
            Title,
            Description,
            MediaType,
            Media,
            Completion,
            Status,
        } = req.body;

        if (!Series || !Title || !Status) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all the fields.',
            });
        }

        if (req.imageArr) {
            if (req.imageArr.length > 1) {
                return res.status(400).json({
                    Message: 'you can insert only One image for banner',
                });
            }
        }

        let dupLearning = await Learning.findOne({Title});
        if (dupLearning) {
            return res
                .status(400)
                .json({success: false, message: 'Learning Item already exists'});
        }

        const ListId = randomBytes(16).toString('hex');
        console.log(Title);

        let Createlearning = await Learning.create({
            Series: Series,
            Season: Season,
            Episode: Episode,
            ListId: ListId,
            Title: Title,
            Description: Description,
            MediaType: MediaType,
            Media: Media,
            Completion: Completion,
            Banner: req.imageArr,
            Status: Status,
        });
        res.status(200).json({
            success: true,
            message: 'Learning Item Added Sucessfully',
            data: Createlearning,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: GET
// @Route : api/Learning/
// @Desc  : Get all Learnings
exports.getLearning = async (req, res) => {
    try {
        const getLearnings = await Learning.find()
            .populate('Series', 'Title')
            .populate('Season', 'Title')
            .populate('Episode', 'Title');
        res.status(200).json({success: true, data: getLearnings});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: GET
// @Route : api/Learning/:id
// @Desc  : Get Learning by id
exports.getLearningById = async (req, res) => {
    try {
        let id = req.params.id;
        const getLearning = await Learning.findById(id);
        res.status(200).json({success: true, data: getLearning});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getLearningByEpisodeId = async (req, res) => {
    try {
        let id = req.params.id;
        const getLearning = await Learning.find({Episode: id});
        res.status(200).json({success: true, data: getLearning});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: DELETE
// @Route : api/Learning/:id
// @Desc  : Delete Learning by id
exports.removeLearning = async (req, res) => {
    try {
        let id = req.params.id;
        const removeLearning = await Learning.remove({_id: id});
        res.status(200).json({
            success: true,
            message: 'Learning Item Deleted Successfully',
            data: removeLearning,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: PATCH
// @Route : api/Learning/:id
// @Desc  : Handling the updation of Learning
exports.updateLearning = async (req, res, next) => {
    try {
        const {
            Series,
            Season,
            Episode,
            ListId,
            Title,
            Description,
            MediaType,
            Media,
            Completion,
            Banner,
            Status,
        } = req.body;
        const id = req.params.id;
        if (!Series || !Title || !Status || !id) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all the fields.',
            });
        }
        if (req.imageArr) {
            if (req.imageArr.length > 1) {
                return res.status(400).json({
                    Message: 'you can insert only One image for banner',
                });
            } else {
                const updatedLearning = await Learning.updateOne(
                    {_id: id},
                    {
                        $set: {
                            Series: Series,
                            Season: Season,
                            Episode: Episode,
                            ListId: ListId,
                            Title: Title,
                            Description: Description,
                            Media: Media,
                            Banner: req.imageArr,
                            MediaType: MediaType,
                            Completion: Completion,
                            Status: Status,
                        },
                    }
                );
                res.status(200).json({
                    success: true,
                    message: 'Learning Item Updated Successfully',
                    data: updatedLearning,
                });
            }
        } else {
            const updatedLearning = await Learning.updateOne(
                {_id: id},
                {
                    $set: {
                        Series: Series,
                        Season: Season,
                        Episode: Episode,
                        ListId: ListId,
                        Title: Title,
                        Description: Description,
                        Media: Media,
                        MediaType: MediaType,
                        Completion: Completion,
                        Status: Status,
                    },
                }
            );
            res.status(200).json({
                success: true,
                message: 'Learning Item Updated Successfully',
                data: updatedLearning,
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
