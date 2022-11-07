require('dotenv').config();

// Swagger config
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.json');
const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Express config and routes
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use('/', express.json());
app.use('/public', express.static(path.join(__dirname + '/public')));

app.get('/downloads', (req, res) => {
	const filename = req.query.file;
	res.sendFile(path.join(__dirname + '/public/memes', filename));
});

const { apiRoutes } = require('./src');
app.listen(port, () => {
	console.log(`http://localhost:${port}/`);
});

/**
 * @swagger
 * /test/{id}:
 *   get:
 *     tags:
 *       - Test
 *     description: Test with id
 *     parameters:
 *       - in: query
 *         name: ramon
 *         description: lastname
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: endpoint works
 */
app.use('/test/:id', (req, res) => {
	res.send('test endpoint');
});

/**
 * @swagger
 * /test:
 *   get:
 *     tags:
 *       - Test
 *     description: Test without id
 *     responses:
 *       200:
 *         description: Cool endpoint
 */
app.use('/test/', (req, res) => {
	res.send('test endpoint');
});

app.use('', apiRoutes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Database config
const databaseModule = require('./database');
const exp = require('constants');
databaseModule
	.connect()
	.then((client) => {
		databaseModule.setDB(client.db(process.env.DB_NAME));
	})
	.catch((err) => {
		console.log('Database connection error  - database/connect.js', err);
	});
