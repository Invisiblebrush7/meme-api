const router = require('express').Router();
const usersController = require('./controller');

router.get('', usersController.index);
router.get('/:id', usersController.show);

module.exports = router;
