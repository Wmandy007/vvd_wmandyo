const Level = require('../models/Level');

// @Method: Get
// @Route : api/level
// @Desc  : Get all game level
exports.getAll = async (req, res, next) => {
  try {
    const allLevels = await Level.find({ isDeleted: false })
      .populate('questions')
      .populate('client', 'fullName');
    return res.status(200).json(allLevels);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Get
// @Route : api/level
// @Desc  : Get all active game level
exports.getAllActive = async (req, res, next) => {
  try {
    const allLevels = await Level.find({ isDeleted: false, status: true });
    return res.status(200).json(allLevels);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Post
// @Route : api/level
// @Desc  : Crate new level
exports.create = async (req, res, next) => {
  try {
    const { client, selectedGame, level, totalPoints, passPoints, maxAttempt } =
      req.body;
    if (
      !client ||
      !selectedGame ||
      !level ||
      !totalPoints ||
      !passPoints ||
      !maxAttempt
    ) {
      return res
        .status(400)
        .json({ message: 'Please fill all requirement field' });
    }

    const findLevelWithName = await Level.find({ level });
    console.log(findLevelWithName);
    if (findLevelWithName.length > 0) {
      return res.status(400).json({ message: 'Level is already created' });
    }

    const levelInstance = new Level({
      client,
      selectedGame,
      level,
      totalPoints,
      passPoints,
      maxAttempt,
      questions: [],
    });

    await levelInstance.save();

    return res.status(200).json({ message: ` Level added successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Get
// @Route : api/level/:id
// @Desc  : Crate new level
exports.find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findLevel = await Level.findById(id);
    if (!findLevel) {
      return res.status(400).json({ message: 'Level not found' });
    }

    return res.status(200).json(findLevel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Put
// @Route : api/level/:id
// @Desc  : Update existing question
exports.update = async (req, res, next) => {
  try {
    const { client, selectedGame, level, totalPoints, passPoints, maxAttempt } =
      req.body;
    const { id } = req.params;

    if (
      !client ||
      !selectedGame ||
      !level ||
      !totalPoints ||
      !passPoints ||
      !maxAttempt
    ) {
      return res
        .status(400)
        .json({ message: 'Please fill all requirement field' });
    }

    await Level.findByIdAndUpdate(id, {
      $set: {
        client,
        selectedGame,
        level,
        totalPoints,
        passPoints,
        maxAttempt,
      },
    });

    return res.status(200).json({ message: `Level Updated successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Put
// @Route : api/level/status/:id
// @Desc  : Update  level status
exports.statusUpdate = async (req, res, next) => {
  try {
    const [{ status }, { id }] = [req.body, req.params];

    await Level.findByIdAndUpdate(id, {
      $set: {
        status,
      },
    });

    return res.status(202).json({ message: `Level status successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @Method: Delete
// @Route : api/level/soft/:id
// @Desc  : Soft delete level
exports.softRemove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Level.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
      },
    });

    return res.status(202).json({ message: `Level deleted successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// @Method: Delete
// @Route : api/level/:id
// @Desc  : Delete level
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Level.findByIdAndRemove(id);

    return res.status(200).json({ message: `Level Permanently successfully!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
