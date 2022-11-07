const router = require('express').Router();
const controller = require('./controller');

const archivo = require('../modules/middlewares/files');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', archivo.single('image'), controller.create);

module.exports = router;
