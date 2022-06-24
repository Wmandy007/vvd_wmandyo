const Recomended = require('../models/Recomended');
const {randomBytes} = require('crypto');

// @Method: POST
// @Route : api/Learning/create
// @Desc  : Handling the creation of Learning
exports.createRecomended = async (req, res, next) => {
    try {
        const {
            Links,
            Client,
            Images
        } = req.body;

        if (!Client) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all the fields.',
            });
        }

        await Recomended.remove({Client: Client});
        
        let CreateRecomended = await Recomended.create({
            Client: Client,
            Banner: Images,
            Link: Links
        });
        res.status(200).json({
            success: true,
            message: 'Recomended Added Sucessfully',
            data: CreateRecomended,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @Method: GET
// @Route : api/Learning/
// @Desc  : Get all Learnings
exports.getRecomended = async (req, res) => {
    // try {
    //     const getLearnings = await Learning.find()
    //         .populate('Series', 'Title')
    //         .populate('Season', 'Title')
    //         .populate('Episode', 'Title');
    //     res.status(200).json({success: true, data: getLearnings});
    // } catch (error) {
    //     res.status(500).json({message: error.message});
    // }
};

// @Method: GET
// @Route : api/Learning/:id
// @Desc  : Get Learning by id
exports.getRecomendedByClientId = async (req, res) => {
    try {
        let id = req.params.id;
        const getLearning = await Recomended.findOne({Client: id});
        res.status(200).json({success: true, data: getLearning});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

