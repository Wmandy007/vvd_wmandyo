const express = require('express')
const { uploadMobileMedia } = require('../controllers/uploadMobileImage')
const multipleMobileImages = require('../config/multipleMobileImage')
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
  limits: { fileSize: 500000 },
}).array('file')

router.post('/', multipleUpload, multipleMobileImages, uploadMobileMedia)
module.exports = router
