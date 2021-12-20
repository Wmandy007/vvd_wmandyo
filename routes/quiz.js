const express = require("express");
const multipleImages = require("../config/multipleImage");
const {
  createQuiz,
  getQuiz,
  getQuizById,
  getQuizByLearningItemId,
  removeQuiz,
  updateQuiz,
} = require("../controllers/quiz");
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
router.post("/create", multipleUpload, multipleImages, createQuiz);
router.get("/", getQuiz);
router.get("/:id", getQuizById);
router.get("/learning/:id", getQuizByLearningItemId);
router.delete("/:id", removeQuiz);
router.patch("/:id", multipleUpload, multipleImages, updateQuiz);
module.exports = router;
