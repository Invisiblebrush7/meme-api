const userRoutes = require('./users/routes');
const router = require('express').Router();

router.use('/users', userRoutes);

module.exports = { apiRoutes: router };
