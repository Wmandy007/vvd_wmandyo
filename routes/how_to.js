const express = require("express");
const multipleImages = require("../config/multipleImage");

const {
  createHow,
  getHowByEpisode,
  getHow,
  updateHow,
  removeHow,
  getHowById
} = require("../controllers/how_to");

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

router.post("/create", multipleUpload, multipleImages, createHow);
router.get("/admin/:id", getHowById);

router.get("/:episode", getHowByEpisode);

router.get("/", getHow);
router.patch("/:id", multipleUpload, multipleImages, updateHow);
router.delete("/:id", removeHow);



module.exports = router;