const express = require('express');
const multipleImages = require('../config/multipleImage');

const {
    createRecomended,
    getRecomended,
    getRecomendedByClientId,
} = require('../controllers/recomended');

const router = express.Router();
const multer = require('multer');

var storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    },
});

var multipleUpload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
}).array('file', 1);

router.post('/create', multipleUpload, multipleImages, createRecomended);
router.get('/', getRecomended);
router.get('/:id', getRecomendedByClientId);



module.exports = router;
