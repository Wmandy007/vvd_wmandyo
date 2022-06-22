const express = require('express')
const { uploadMedia } = require('../controllers/uploadimage')
const multipleImages = require('../config/multipleImage')
const multer = require('multer')
const router = express.Router()
var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
    console.log('testing')
  },
})
var multipleUpload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
}).array('file')

router.post('/', multipleUpload, multipleImages, uploadMedia)
module.exports = router
