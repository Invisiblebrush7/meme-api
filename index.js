const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const { apiRoutes } = require('./src');
app.listen(port, () => {
	console.log(`http://localhost:/${port}/`);
});

app.use('', apiRoutes);

app.get('', (req, res) => {
	res.send('API works');
});

const databaseModule = require('./database');
databaseModule
	.connect()
	.then((client) => {
		databaseModule.setDB(client.db(process.env.DB_NAME));
	})
	.catch((err) => {
		console.log('Database connection error  - database/connect.js', err);
	});
