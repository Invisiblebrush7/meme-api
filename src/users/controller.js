const User = require('./model');

class UsersController {
	async index(req, res) {
		const collection = User.index();
		const users = await collection.find().toArray();
		res.json(users);
	}
	async show(req, res) {
		const collection = databaseModule.getDB().collection('users');
		const user = await collection.find({ _id: req.params.id }).toArray();
		res.json(user);
	}
}

module.exports = new UsersController();
