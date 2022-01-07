const router = require('express').Router();
const multipleImages = require('../config/multipleImage');
const { getAll, create } = require('../controllers/gameController');
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
router.get('/', getAll);
router.post('/', multipleUpload, multipleImages, create);

module.exports = router;
