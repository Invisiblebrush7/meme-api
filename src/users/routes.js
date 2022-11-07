const router = require('express').Router();
const usersController = require('./controller');

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Returns an array of users
 */
router.get('', usersController.index);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Get the user with same id
 *     responses:
 *       200:
 *         description: Returns a user with same id
 */
router.get('/:id', usersController.show);

module.exports = router;
