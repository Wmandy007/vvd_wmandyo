const Game = require('../models/HotGame');

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

// @Method: Get
// @Route : api/game/:id
// @Desc  : Get a game quiz with id
exports.find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);

    return res.status(201).json(game);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Get
// @Route : api/game/:id
// @Desc  : Get a game quiz with id
exports.statusUpdate = async (req, res, next) => {
  try {
    const { id, status } = req.body;

    const quiz = await Game.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    await Game.findByIdAndUpdate(id, {
      $set: { status: !!status },
    });

    return res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Post
// @Route : api/game
// @Desc  : Create a new game quiz
exports.create = async (req, res, next) => {
  try {
    const {
      gameType,
      selectedGame,
      description,
      options,
      situationTitle,
      commentBoxText,
      youCommentText,
    } = req.body;

    // if (!commentBoxText || commentBoxText.length > 270) {
    //   return res
    //     .status(400)
    //     .json('Comment box text must be less then 270 chars');
    // }
    const parseOptions = JSON.parse(options);

    const banner = req?.images?.file || '';
    const youImage = req?.images?.yourImage || '';
    const characterImage = req?.images?.characterImage || '';
    const gameInstance = new Game({
      gameType,
      selectedGame,
      description,
      options: parseOptions,
      banner,
      situationTitle,
      youImage,
      characterImage,
      commentBoxText,
      youCommentText,
    });
    const game = await gameInstance.save();

    return res.status(201).json(game);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Put
// @Route : api/game/:id
// @Desc  : Create a new game quiz
exports.update = async (req, res, next) => {
  try {
    const {
      gameType,
      selectedGame,
      description,
      options,
      situationTitle,
      commentBoxText,
      youCommentText,
    } = req.body;
    const parseOptions = JSON.parse(options);
    const { id } = req.params;
    const findGame = await Game.findById(id);
    if (!findGame) {
      throw new Error('Game not found!');
    }

    const gameData = {
      gameType,
      selectedGame,
      description,
      options: parseOptions,
      situationTitle,
      commentBoxText,
      youCommentText,
    };
    const banner = req?.images?.file;
    const youImage = req?.images?.yourImage;
    if (banner) {
      gameData.banner = banner;
    }
    if (youImage) {
      gameData.youImage = youImage;
    }

    await Game.findByIdAndUpdate(id, {
      $set: gameData,
    });

    return res.status(200).json({ message: 'Quiz Updated Successfully!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Delete
// @Route : api/game/:id
// @Desc  : Delete a game quiz with id
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    // await Game.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Quiz deleted successfully!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
