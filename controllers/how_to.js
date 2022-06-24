const HowTo = require("../models/HowTo");

// @Method: POST
// @Route : api/Game/create
// @Desc  : Handling the creation of Game
exports.createHow = async (req, res) => {
  try {
    const {
      Title,
      Description,
      DescriptionNot,
      Episode,
      Series,
      Season,
      Client
    } = req.body;
    
    if (!req.imageArr) {
      return res.status(400).json({
        message: "image is required",
      });
    }
    
    let dupGame = await HowTo.findOne({ Title , Episode});
    if (dupGame) {
      return res
        .status(400)
        .json({ success: false, message: "Game already exists" });
    }
    let episode = await HowTo.create({
      Episode,
      Series,
      Season,
      Title,
      Description,
      DescriptionNot,
      Client,
      Image: req.imageArr,
    });
    res.status(200).json({
      success: true,
      message: "HowTo Added Sucessfully",
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/Game/client
// @Desc  : Get all Game by client
exports.getHowByEpisode = async (req, res) => {
  try {
    const episodes = await HowTo.find({Episode: req.params.episode});
    res.status(200).json({ success: true, data: episodes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHowById = async (req, res) => {
  try {
    const episodes = await HowTo.find({_id: req.params.id});
    res.status(200).json({ success: true, data: episodes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @Method: GET
// @Route : api/Game/
// @Desc  : Get all Game
exports.getHow = async (req, res) => {
  try {
    const episodes = await HowTo.find().populate('Series').populate('Season').populate('Episode').populate('Client');
    res.status(200).json({ success: true, data: episodes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};


exports.removeHow = async (req, res) => {
  try {
    let id = req.params.id;
    const removeEpisode = await HowTo.remove({ _id: id });
    res.status(200).json({
      success: true,
      message: "HowTo Deleted Successfully",
      data: removeEpisode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateHow = async (req, res, next) => {
  try {
     const {
      Title,
      Description,
      DescriptionNot,
      Episode,
      Series,
      Season,
      Client
    } = req.body;
    
    const id = req.params.id;
    
    let episode = await HowTo.updateOne({
         _id: id
    } , {
      Episode,
      Series,
      Season,
      Title,
      Description,
      DescriptionNot,
      Client,
      Image: req.imageArr,
    });
    res.status(200).json({
      success: true,
      message: "HowTo Edited Sucessfully",
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

