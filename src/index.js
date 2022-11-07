const userRoutes = require('./users/routes');
const router = require('express').Router();
const memeRoutes = require('./memes/routes');

router.use('/users', userRoutes);
router.use('/memes', memeRoutes);

router.get('', (req, res) => {
	res.send('API works');
});

module.exports = { apiRoutes: router };
