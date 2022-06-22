const Question = require('../models/Question');
const { LightItUpGame, LightGamePair } = require('../models/LightItUpGame');

// @Method: Get
// @Route :  api/light-it-up/public
// @Desc  : Get all game for public
exports.getAllPublic = async (req, res, next) => {
  try {
    const allGames = await LightItUpGame.find({
      isDeleted: false,
      status: true,
    }).select('description createdAt');

    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Get
// @Route :  api/light-it-up
// @Desc  : Get all game for admin
exports.getAll = async (req, res, next) => {
  try {
    const allGames = await LightItUpGame.find({ isDeleted: false });
    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Get
// @Route :  api/light-it-up/pair/public
// @Desc  : Get all game for admin
exports.getAllPairPublic = async (req, res, next) => {
  try {
    const allGamesPair = await LightGamePair.find({
      isDeleted: false,
      status: true,
    }).select('aFile bFile aText bText points createdAt lightUpGameId');
    return res.status(200).json(allGamesPair);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Get
// @Route :  api/light-it-up/pair
// @Desc  : Get all game for admin
exports.getAllPair = async (req, res, next) => {
  try {
    console.log('get all pair');
    const allGamesPairs = await LightGamePair.find({ isDeleted: false });
    return res.status(200).json(allGamesPairs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Get
// @Route :  api/light-it-up/:id
// @Desc  : Get a game with id
exports.find = async (req, res, next) => {
  try {
    const { id } = req.params;

    const game = await LightItUpGame.findById(id);
    if (!game || game?.isDeleted) {
      return res.status(400).json({ message: 'Game not found' });
    }
    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Get
// @Route :  api/light-it-up/:id
// @Desc  : Get a game with id
exports.findPair = async (req, res, next) => {
  try {
    const { id } = req.params;

    const game = await LightGamePair.findById(id);
    if (!game || game?.isDeleted) {
      return res.status(400).json({ message: 'Game pair not found' });
    }
    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Post
// @Route :  api/light-it-up
// @Desc  : Crate new game
exports.create = async (req, res, next) => {
  try {
    const { description } = req.body;

    const instance = new LightItUpGame({
      description,
    });

    const game = await instance.save();

    return res.status(200).json(game);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};
// @Method: Post
// @Route :  api/light-it-up/:gameId/pair
// @Desc  : Crate new game
exports.createPair = async (req, res, next) => {
  try {
    const aFile = req.images.find((i) => i.name === 'aFile')?.location;
    const bFile = req.images.find((i) => i.name === 'bFile')?.location;
    const { aText, bText, points } = req.body;
    const { gameId } = req.params;

    const instance = new LightGamePair({
      aFile: aFile ? aFile : null,
      bFile: bFile ? bFile : null,
      aText,
      bText,
      points,
      lightUpGameId: gameId,
    });

    const pairData = await instance.save();

    const game = await LightItUpGame.findByIdAndUpdate(gameId, {
      $push: { pair: pairData._id },
    });

    return res.status(200).json(pairData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Put
// @Route :  api/light-it-up/:id
// @Desc  : Update existing game
exports.updatePair = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findGamePair = LightGamePair.findById(id);
    if (!findGamePair || findGamePair?.isDeleted) {
      return res.status(404).json({ message: 'Game Pair not found' });
    }
    const aFile = req.images.find((i) => i.name === 'aFile')?.location;
    const bFile = req.images.find((i) => i.name === 'bFile')?.location;
    const { aText, bText, points, lightUpGameId } = req.body;

    const data = {
      aText,
      bText,
      points,
      lightUpGameId,
    };
    if (aFile) {
      data.aFile = aFile;
    }
    if (bFile) {
      data.bFile = bFile;
    }

    const pairData = await LightGamePair.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );

    if (findGamePair.lightUpGameId !== lightUpGameId) {
      await LightItUpGame.findByIdAndUpdate(lightUpGameId, {
        $push: { pair: pairData._id },
      });
      await LightItUpGame.findByIdAndUpdate(findGamePair.lightUpGameId, {
        $pull: { pair: id },
      });
    }

    return res.status(200).json(pairData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Put
// @Route :  api/light-it-up/:id
// @Desc  : Update game pair
exports.update = async (req, res, next) => {
  try {
    const [{ description }, { id }] = [req.body, req.params];

    if (!description) {
      return res
        .status(400)
        .json({ message: 'Please fill all requirement field' });
    }

    await LightItUpGame.findByIdAndUpdate(id, {
      $set: {
        description,
      },
    });

    return res.status(200).json({ message: `Game Updated successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Put
// @Route :  api/light-it-up/status/:id
// @Desc  : Update status game
exports.statusUpdate = async (req, res, next) => {
  try {
    const [{ status }, { id }] = [req.body, req.params];

    await LightItUpGame.findByIdAndUpdate(id, {
      $set: {
        status,
      },
    });

    return res.status(202).json({ message: `Game  status successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Put
// @Route :  api/light-it-up/status/pair/:id
// @Desc  : Update status game
exports.statusUpdatePair = async (req, res, next) => {
  try {
    const [{ status }, { id }] = [req.body, req.params];

    await LightGamePair.findByIdAndUpdate(id, {
      $set: {
        status,
      },
    });

    return res.status(202).json({ message: `Pair status successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Delete
// @Route :  api/light-it-up/soft/:id
// @Desc  : Soft delete game
exports.softRemove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findGame = await LightItUpGame.findById(id);
    if (!findGame) {
      return res.status(404).json({ message: 'Game not found!' });
    }

    await LightItUpGame.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
      },
    });

    return res.status(202).json({ message: `Questions deleted successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Delete
// @Route :  api/light-it-up/soft/pair/:id
// @Desc  : Soft delete game
exports.softRemovePair = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findGame = await LightGamePair.findById(id);
    if (!findGame) {
      return res.status(404).json({ message: 'Game Pair not found!' });
    }

    await LightGamePair.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
      },
    });

    return res.status(202).json({ message: `Game pair deleted successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Delete
// @Route :  api/light-it-up/:id
// @Desc  : Soft delete game
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findGame = await LightItUpGame.findById(id);
    if (!findGame) {
      return res.status(404).json({ message: 'Game not found!' });
    }
    await LightItUpGame.findByIdAndRemove(id);

    return res
      .status(200)
      .json({ message: `Game permanently delete successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Delete
// @Route :  api/light-it-up/:id
// @Desc  : Soft delete game
exports.removePairImage = async (req, res, next) => {
  try {
    const { id, type } = req.params;

    const findGame = await LightGamePair.findById(id);
    if (!findGame) {
      return res.status(404).json({ message: 'Pair not found!' });
    }
    console.log({ [type]: null });
    await LightGamePair.findByIdAndUpdate(id, {
      $set: {
        [type]: '',
      },
    });

    return res.status(200).json({ message: `Image delete successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
