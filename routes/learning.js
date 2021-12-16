const express = require('express');
const multipleImages = require('../config/multipleImage');
const {
  createLearning,
  getLearning,
  getLearningById,
  removeLearning,
  updateLearning,
} = require('../controllers/learning');
const router = express.Router();
const multer = require('multer');
var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});
var multipleUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).array('file', 1);

router.post('/create', multipleUpload, multipleImages, createLearning);
router.get('/', getLearning);
router.get('/:id', getLearningById);
router.delete('/:id', removeLearning);
router.patch('/:id', multipleUpload, multipleImages, updateLearning);
module.exports = router;
