const router = require('express').Router();

const {
  getAll,
  create,
  update,
  statusUpdate,
  softRemove,
  remove,
  find,
  getAllActive,
} = require('../controllers/levelController');

router.get('/', getAll);
router.get('/active', getAllActive);
router.post('/', create);
router.get('/:id', find);
router.put('/:id', update);
router.put('/status/:id', statusUpdate);
router.delete('/soft/:id', softRemove);
router.delete('/:id', remove);

module.exports = router;
