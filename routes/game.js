const express = require("express");
const multipleImages = require("../config/multipleImage");

const {
  createGame,
  getGameByClient,
  getGame,
  updateGame,
  removeGame,
  getGameById
} = require("../controllers/game");

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

router.post("/create", multipleUpload, multipleImages, createGame);
router.get("/admin/:id", getGameById);

router.get("/:client", getGameByClient);

router.get("/", getGame);
router.patch("/:id", multipleUpload, multipleImages, updateGame);
router.delete("/:id", removeGame);



module.exports = router;