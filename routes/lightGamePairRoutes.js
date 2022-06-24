const router = require('express').Router();
const multipleImageForPair = require('../config/multipleImageForPair');
const {
  findPair,
  createPair,
  getAllPair,
  statusUpdatePair,
  softRemovePair,
  updatePair,
  getAllPairPublic,
  removePairImage,
} = require('../controllers/lightItUpGameController');
const multer = require('multer');

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});

const multipleUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).fields([
  {
    name: 'aFile',
    maxCount: 1,
  },
  {
    name: 'bFile',
    maxCount: 1,
  },
]);

router.get('/', getAllPair);
router.get('/public', getAllPairPublic);
router.get('/:id', findPair);
router.post('/:gameId/', multipleUpload, multipleImageForPair, createPair);
router.put('/:id', multipleUpload, multipleImageForPair, updatePair);
router.put('/status/:id', statusUpdatePair);
router.delete('/soft/:id', softRemovePair);
router.delete('/image/:id/:type', removePairImage);

module.exports = router;
