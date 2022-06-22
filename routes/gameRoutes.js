const router = require('express').Router();
const multipleImages = require('../config/multipleImage');
const {
  getAll,
  create,
  find,
  update,
  remove,
  statusUpdate,
} = require('../controllers/gameController');
const multer = require('multer');
var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});
var multipleUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const fileUpload = multipleUpload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'yourImage', maxCount: 1 },
  { name: 'characterImage', maxCount: 1 },
]);

const fileUploadSizer = (req, res, next) => {
  const files = req.files;
  const fileArray = Object.values(files).map((item) => item[0]);
  req.files = fileArray;
  console.log(fileArray);
  return next();
};

router.get('/', getAll);
router.post('/', fileUpload, fileUploadSizer, multipleImages, create);
router.get('/:id', find);
router.post('/status', statusUpdate);
router.put('/:id', fileUpload, fileUploadSizer, multipleImages, update);
router.delete('/:id', remove);

module.exports = router;
