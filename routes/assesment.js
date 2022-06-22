const express = require('express');
const multipleImages = require('../config/multipleImage');
const {
  createAssesment,
  getAssesment,
  getAssesmentById,
  getAssesmentByClientId,
  removeAssesment,
  updateAssesment
} = require('../controllers/assesment');
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

router.get('/', getAssesment);
router.post('/create', createAssesment);
router.get('/client/:id', getAssesmentByClientId);
router.get('/:id', getAssesmentById);


router.delete('/:id', removeAssesment);
router.patch('/:id', updateAssesment);

module.exports = router;