const router = require('express').Router();
const {
  getAll,
  create,
  update,
  statusUpdate,
  softRemove,
  remove,
  find,
  getAllPublic,
} = require('../controllers/lightItUpGameController');

router.get('/', getAll);
router.get('/public', getAllPublic);
router.get('/:id', find);
router.post('/', create);
router.put('/:id', update);
router.put('/status/:id', statusUpdate);
router.delete('/soft/:id', softRemove);
router.delete('/:id', remove);

module.exports = router;
