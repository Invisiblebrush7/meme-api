const databaseModule = require('./../../database/database');

class User {
	static index() {
		const collection = databaseModule.getDB().collection('users');
		return collection;
	}
}

module.exports = User;
