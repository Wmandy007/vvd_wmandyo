const express = require("express");
const multipleImages = require("../config/multipleImage");
const {
  createSeason,
  getSeason,
  getSeasonById,
  getSeasonBySeriesId,
  removeSeason,
  updateSeason,
} = require("../controllers/season");
const router = express.Router();
const multer = require("multer");
var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
var multipleUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).array("file", 1);
router.post("/create", multipleUpload, multipleImages, createSeason);
router.get("/", getSeason);
router.get("/:id", getSeasonById);
router.get("/series/:id", getSeasonBySeriesId);
router.delete("/:id", removeSeason);
router.patch("/:id", multipleUpload, multipleImages, updateSeason);
module.exports = router;
