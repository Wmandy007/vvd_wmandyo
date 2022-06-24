const express = require('express');
const multipleImages = require('../config/multipleImage');
const {
  createSeries,
  getSeries,
  getSeriesById,
  removeSeries,
  updateSeries,
  getClientSeries
} = require('../controllers/series');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

const multipleUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).array('file', 1);

router.get('/', getSeries);
router.post('/create', multipleUpload, multipleImages, createSeries);
router.get('/:id', getSeriesById);

router.get('/client/:id', getClientSeries);

router.delete('/:id', removeSeries);
router.patch('/:id', multipleUpload, multipleImages, updateSeries);
module.exports = router;
