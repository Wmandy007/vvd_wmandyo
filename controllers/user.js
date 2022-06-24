const User = require('../models/User');

// @route GET api/user
// @desc Returns all users
// @access Public
exports.show = async function (req, res) {
    const users = await User.find()
        .select('-password')
        .populate('Client', 'fullName');
    res.status(200).json({users});
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.showById = async function (req, res) {
    try {
        const id = req.params.id;

        const user = await User.findById(id).select('-password');
        if (!user)
            return res.status(401).json({message: 'User does not exist'});

        if (!user.score) {
             await User.findByIdAndUpdate(
                id,
                {
                    $set: {
                        score: 0
                    }
                },
                {new: true}
            );
        }
        if (!user.overall_completion) {
             await User.findByIdAndUpdate(
                id,
                {
                    $set: {
                        overall_completion: 0
                    }
                },
                {new: true}
            );
        }

        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// @route PATCH api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;

        const user = await User.findByIdAndUpdate(
            id,
            {$set: update},
            {new: true}
        );

        return res.status(200).json({message: 'Account updated Sucessfully'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

exports.EditPre = async function (req, res) {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndUpdate(
            id,
            {$set: {pre_ass: false}},
            {new: true}
        );

        return res.status(200).json({message: 'pre ass updated to false Sucessfully'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};


// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(401).json({message: 'User does not exist'});
        await User.findByIdAndUpdate(id, {$set: {isActive: 'false'}});

        res.status(200).json({message: 'Account has been deactivated'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// @route PATCH api/user/activateuser/{id}
// @desc Activate User Account
// @access Public
exports.activateUser = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(401).json({message: 'User does not exist'});

        await User.findByIdAndUpdate(id, {$set: {isActive: 'true'}});

        res.status(200).json({message: 'Account has been Activated'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};
