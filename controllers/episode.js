const Episode = require("../models/Episode");

// @Method: POST
// @Route : api/Episode/create
// @Desc  : Handling the creation of Episode
exports.createEpisode = async (req, res) => {
  try {
    const {
      Series,
      Season,
      Title,
      Description,
      Completion,
      LearningItem,
      Games,
      PostAssenment,
      Status,
    } = req.body;
    if (!Series || !Title || !Status) {
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
    if (req.imageArr.length > 1) {
      return res.status(400).json({
        Message: "you can insert only One image for banner",
      });
    }
    let dupEpisode = await Episode.findOne({ Title });
    if (dupEpisode) {
      return res
        .status(400)
        .json({ success: false, message: "Episode already exists" });
    }
    let episode = await Episode.create({
      Series,
      Season,
      Title,
      Description,
      Completion,
      LearningItem,
      Games,
      PostAssenment,
      Banner: req.imageArr,
      Status,
    });
    res.status(200).json({
      success: true,
      message: "Episode Added Sucessfully",
      data: episode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/Episode/
// @Desc  : Get all Episodes
exports.getEpisode = async (req, res) => {
  try {
    const episodes = await Episode.find();
    res.status(200).json({ success: true, data: episodes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/Episode/season/:id
// @Desc  : Get Episode by season id
exports.getEpisodeBySeasonId = async (req, res) => {
  try {
    let id = req.params.id;
    const episode = await Episode.find({ Season: id });
    res.status(200).json({ success: true, data: episode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: GET
// @Route : api/Episode/:id
// @Desc  : Get Episode by id
exports.getEpisodeById = async (req, res) => {
  try {
    let id = req.params.id;
    const episode = await Episode.findById(id);
    res.status(200).json({ success: true, data: episode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: DELETE
// @Route : api/Episode/:id
// @Desc  : Delete Episode by id
exports.removeEpisode = async (req, res) => {
  try {
    let id = req.params.id;
    const removeEpisode = await Episode.remove({ _id: id });
    res.status(200).json({
      success: true,
      message: "Episode Deleted Successfully",
      data: removeEpisode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: PATCH
// @Route : api/Episode/:id
// @Desc  : Handling the updation of Episode
exports.updateEpisode = async (req, res, next) => {
  try {
    const {
      Series,
      Season,
      Title,
      Description,
      Completion,
      LearningItem,
      Games,
      PostAssenment,
      Status,
    } = req.body;
    const id = req.params.id;
    if (!Series || !Title || !Status || !id) {
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

        const updatedEpisode = await Episode.updateOne(
          { _id: id },
          {
            $set: {
              Season: Series,
              Season: Season,
              Title: Title,
              Description: Description,
              Completion: Completion,
              LearningItem: LearningItem,
              Games: Games,
              PostAssenment: PostAssenment,
              Banner: req.imageArr,
              Status: Status,
            },
          }
        );
        res.status(200).json({
          success: true,
          message: "Episode Updated Successfully",
          data: updatedEpisode,
        });
      }
    } else {
      
      const updatedEpisode = await Episode.updateOne(
        { _id: id },
        {
          $set: {
            Season: Series,
            Season: Season,
            Title: Title,
            Description: Description,
            Completion: Completion,
            LearningItem: LearningItem,
            // Dictionary: Dictionary,
            Games: Games,
            PostAssenment: PostAssenment,
            Status: Status,
          },
        }
      );
      console.log(updatedEpisode);
      res.status(200).json({
        success: true,
        message: "Episode Updated Successfully",
        data: updatedEpisode,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
