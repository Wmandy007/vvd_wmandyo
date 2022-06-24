const Season = require('../models/Season');

// @Method: POST
// @Route : api/season/create
// @Desc  : Handling the creation of season
exports.createSeason = async (req, res, next) => {
  try {
    const {
      Series,
      Title,
      Description,
      Competency,
      LearningOutcomes,
      TakeAway,
      CompletionCriteria,
      Status,
    } = req.body;
    if (!Series || !Title || !Status) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all the fields.',
      });
    }
    if (!req.imageArr) {
      return res.status(400).json({
        message: 'image is required',
      });
    }
    if (req.imageArr.length > 1) {
      return res.status(400).json({
        Message: 'you can insert only One image for banner',
      });
    }
    let dupSeason = await Season.findOne({ Title });
    if (dupSeason) {
      return res
        .status(400)
        .json({ success: false, message: 'Season already exists' });
    }

    const seriesArray = Series.split(',');
    const allSeason = [];

    const addItem = (id) => {
      return new Promise(async (resolve) => {
        let season = await Season.create({
          Series: id,
          Title,
          Description,
          Competency,
          LearningOutcomes,
          TakeAway,
          CompletionCriteria,
          Banner: req.imageArr,
          Status,
        });

        allSeason.push(season);
        return resolve(true);
      });
    };

    const addAll = () => {
      const promises = seriesArray.map((id) => addItem(id));
      return Promise.all(promises);
    };
    await addAll();

    return res.status(200).json({
      success: true,
      message: 'Season Added Successfully',
      data: allSeason,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/season/
// @Desc  : Get all seasons
exports.getSeason = async (req, res) => {
  try {
    const seasons = await Season.find();
    res.status(200).json({ success: true, data: seasons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/season/:id
// @Desc  : Get season by id
exports.getSeasonById = async (req, res) => {
  try {
    let id = req.params.id;
    const season = await Season.findById(id);
    console.log(season);
    res.status(200).json({ success: true, data: season });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/season/series/:id
// @Desc  : Get season by series id
exports.getSeasonBySeriesId = async (req, res) => {
  try {
    let id = req.params.id;
    const season = await Season.find({ Series: id });
    res.status(200).json({ success: true, data: season });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @Method: DELETE
// @Route : api/season/:id
// @Desc  : Delete season by id
exports.removeSeason = async (req, res) => {
  try {
    let id = req.params.id;
    const removeSeason = await Season.remove({ _id: id });
    res.status(200).json({
      success: true,
      message: 'Season Deleted Successfully',
      data: removeSeason,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: PATCH
// @Route : api/season/:id
// @Desc  : Handling the updation of season
exports.updateSeason = async (req, res, next) => {
  try {
    const {
      Series,
      Title,
      Description,
      Competency,
      LearningOutcomes,
      TakeAway,
      CompletionCriteria,
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
        const updatedSeason = await Season.updateOne(
          { _id: id },
          {
            $set: {
              Series: Series,
              Title: Title,
              Description: Description,
              Competency: Competency,
              LearningOutcomes: LearningOutcomes,
              TakeAway: TakeAway,
              CompletionCriteria: CompletionCriteria,
              Banner: req.imageArr,
              Status: Status,
            },
          }
        );
        res.status(200).json({
          success: true,
          message: 'Season Updated Successfully',
          data: updatedSeason,
        });
      }
    } else {
      const updatedSeason = await Season.updateOne(
        { _id: id },
        {
          $set: {
            Series: Series,
            Title: Title,
            Description: Description,
            Competency: Competency,
            LearningOutcomes: LearningOutcomes,
            TakeAway: TakeAway,
            CompletionCriteria: CompletionCriteria,
            Status: Status,
          },
        }
      );
      res.status(200).json({
        success: true,
        message: 'Season Updated Successfully',
        data: updatedSeason,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
