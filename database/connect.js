require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function connect() {
	return new Promise((resolve, reject) => {
		client.connect((err) => {
			if (!err) {
				console.log('Database connected');
				resolve(client);
			} else {
				reject(err);
			}
		});
	});
}

module.exports = connect;
