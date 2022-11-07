const databaseModule = require('./../../database/database');

class Meme {
	static index() {
		const collection = databaseModule.getDB().collection('meme');
		return collection;
	}
}

module.exports = Meme;
