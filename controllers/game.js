const Game = require("../models/Game");

// @Method: POST
// @Route : api/Game/create
// @Desc  : Handling the creation of Game
exports.createGame = async (req, res) => {
  try {
    const {
      Name,
      Url,
      Episode,
      Series,
      Season,
      Client
    } = req.body;
    if (!Name || !Episode) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the fields.",
      });
    }
    if (!req.imageArr) {
      return res.status(400).json({
        message: "image is required",
      });
    }
    
    let dupGame = await Game.findOne({ Name , Episode});
    if (dupGame) {
      return res
        .status(400)
        .json({ success: false, message: "Game already exists" });
    }
    let episode = await Game.create({
      Episode,
      Series,
      Season,
      Name,
      Url,
      Client,
      Banner: req.imageArr,
    });
    res.status(200).json({
      success: true,
      message: "Name Added Sucessfully",
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/Game/client
// @Desc  : Get all Game by client
exports.getGameByClient = async (req, res) => {
  try {
    const episodes = await Game.find({Episode: req.params.client});
    res.status(200).json({ success: true, data: episodes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const episodes = await Game.find({_id: req.params.id});
    res.status(200).json({ success: true, data: episodes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @Method: GET
// @Route : api/Game/
// @Desc  : Get all Game
exports.getGame = async (req, res) => {
  try {
    const episodes = await Game.find().populate('Series').populate('Season').populate('Episode').populate('Client');
    res.status(200).json({ success: true, data: episodes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.removeGame = async (req, res) => {
  try {
    let id = req.params.id;
    const removeEpisode = await Game.remove({ _id: id });
    res.status(200).json({
      success: true,
      message: "Game Deleted Successfully",
      data: removeEpisode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateGame = async (req, res, next) => {
  try {
    const {
      Name,
      Url,
      Episode,
      Series,
      Season,
      Client
    } = req.body;
    
    const id = req.params.id;
    
    let episode = await Game.updateOne({
         _id: id
    } , {
      Episode,
      Series,
      Season,
      Name,
      Url,
      Client,
      Banner: req.imageArr,
    });
    res.status(200).json({
      success: true,
      message: "Game Edited Sucessfully",
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

