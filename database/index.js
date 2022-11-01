const connect = require('./connect');
const { getDB, setDB } = require('./database');

module.exports = {
	connect,
	setDB,
	getDB,
};
