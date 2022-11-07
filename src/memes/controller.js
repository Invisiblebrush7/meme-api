const Meme = require('./model');
const databaseModule = require('../../database');

class MemesController {
	async index(req, res) {
		const collection = Meme.index();
		const memes = await collection.find().toArray();
		res.json(memes);
	}
	async show(req, res) {
		const collection = databaseModule.getDB().collection('memes');
		const user = await collection.find({ _id: req.params.id }).toArray();
		res.json(user);
	}
	async create(req, res) {
		console.log('Archivo', req.file, req.body);
		res.send('created');
	}
}

module.exports = new MemesController();
