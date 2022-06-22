const Assessment = require("../models/Assessment");
const Client = require("../models/Client");
const mongoose = require("mongoose");

// @Method: POST
// @Route : api/Series/create
// @Desc  : Handling the creation of Series
exports.createAssesment = async (req, res, next) => {
  try {
    const {
      Quiz,
      Client,
      Time,
      Type,
      Point,
      Status,
      assId,
      Name
    } = req.body;

    // if (!req.imageArr) {
    //   return res.status(400).json({
    //     message: "image is required",
    //   });
    // }
    // if (req.imageArr.length > 1) {
    //   return res.status(400).json({
    //     Message: "you can insert only One image for banner",
    //   });
    // }
    
   
    let episode = await Assessment.create({
          Quiz,
          Client,
          Time,
          Type,
          Point,
          Status,
          Name,
          assId,
          Banner: [],
        });


    return res.status(200).json({
      success: true,
      message: "Assessment Added Sucessfully",
      data: episode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/Series/
// @Desc  : Get all Seriess
exports.getAssesment = async (req, res) => {
  try {
    const Seriess = await Assessment.find().populate(
      "Client"
    ).populate(
      "Quiz"
    );
    res.status(200).json({ success: true, data: Seriess });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: GET
// @Route : api/Series/:id
// @Desc  : Get Series by id
exports.getAssesmentById = async (req, res) => {
  try {
    let id = req.params.id;
    const series = await Assessment.findById(id).populate(
      "Client"
    ).populate(
      "Quiz"
    );
    res.status(200).json({ success: true, data: series });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAssesmentByClientId = async (req, res) => {
  try {
    let id = req.params.id;
    const series = await Assessment.find({Client: id}).populate(
      "Client"
    ).populate(
      "Quiz"
    );
    res.status(200).json({ success: true, data: series });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @Method: DELETE
// @Route : api/Series/:id
// @Desc  : Delete Series by id
exports.removeAssesment = async (req, res) => {
  try {
    let id = req.params.id;
    const removeSeries = await Assessment.remove({ _id: id });
    res.status(200).json({
      success: true,
      message: "Assessment Deleted Successfully",
      data: removeSeries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @Method: PATCH
// @Route : api/Series/:id
// @Desc  : Handling the updation of Series
exports.updateAssesment = async (req, res, next) => {
  try {
    const {
      Quiz,
      Client,
      Time,
      Type,
      Name,
      Point,
      assId,
      Status,
    } = req.body;
    
    const id = req.params.id;
    //req.imageArr
    if (false) {
      
        const updatedSeries = await Assessment.updateOne(
          { _id: id },
          {
            $set: {
                Quiz,
                Client,
                Time,
                Type,
                Point,
                Status,
                assId,
                Name,
                Banner: req.imageArr,
            },
          }
        );
        res.status(200).json({
          success: true,
          message: "Assessment Updated Successfully",
          data: updatedSeries,
        });

    } else {
      const updatedSeries = await Assessment.updateOne(
        { _id: id },
        {
          $set: {
            Quiz,
            Client,
            Time,
            Type,
            Point,
            assId,
            Status,
            Name
          },
        }
      );
      res.status(200).json({
        success: true,
        message: "Assessment Updated Successfully",
        data: updatedSeries,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
