const Game = require('../models/Game');

// @Method: Get
// @Route : api/game
// @Desc  : Get all game quiz
exports.getAll = async (req, res, next) => {
    try {
        const allGames = await Game.find();
        return res.status(200).json(allGames);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @Method: Post
// @Route : api/game
// @Desc  : Create a new game quiz
exports.create = async (req, res, next) => {
    try {
        const { gameType, selectedGame, description, options } = req.body;
        const parseOptions = JSON.parse(options);
        const banner = req.imageArr[0];
        const gameInstance = new Game({
            gameType,
            selectedGame,
            description,
            options: parseOptions,
            banner,
        });
        const game = await gameInstance.save();

        return res.status(201).json(game);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
