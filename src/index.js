const userRoutes = require('./users/routes');
const router = require('express').Router();

router.use('/users', userRoutes);

router.get('', (req, res) => {
	res.send('API works');
});

module.exports = { apiRoutes: router };
