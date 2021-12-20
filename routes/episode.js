const express = require("express");
const multipleImages = require("../config/multipleImage");
const {
  createEpisode,
  getEpisode,
  getEpisodeById,
  getEpisodeBySeasonId,
  removeEpisode,
  updateEpisode,
} = require("../controllers/episode");
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
router.post("/create", multipleUpload, multipleImages, createEpisode);
router.get("/", getEpisode);
router.get("/:id", getEpisodeById);
router.get("/season/:id", getEpisodeBySeasonId);
router.delete("/:id", removeEpisode);
router.patch("/:id", multipleUpload, multipleImages, updateEpisode);
module.exports = router;
