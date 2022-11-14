require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_ID);

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

// Download meme
app.get('/downloads', (req, res) => {
	const filename = req.query.file;
	res.sendFile(path.join(__dirname + '/public/memes', filename));
});

const { apiRoutes } = require('./src');
const server = app.listen(port, () => {
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

// Google auth config
app.get('/google/:token', (req, res) => {
	console.log('Hellou');
	googleClient.verifyIdToken({ idToken: req.params.token });
	cl.then((response) => {
		const data = response.getPayload();
		console.log(data);
		res.send('Token is valid');
	}).catch((err) => {
		res.status(401).send('Token is not valid');
	});
});

// Socket io
const socketIO = require('socket.io');
const io = socketIO(server, {
	cors: {
		origin: '*',
		// methods: ['GET', 'POST'],
		// allowHeaders: ['Authorization'],
		// credentials: true,
	},
});

io.on('connection', (socket) => {
	// console.log('Alguien se conecto :D ', socket);

	socket.on('share', (data) => {
		console.log('Hellou desde el socket de api\n', data);

		// io.emit('onShared', data); // emit comparte con todos, incluido tú
		socket.broadcast.emit('onShared', data);
	});
});

// Database config
const databaseModule = require('./database');
databaseModule
	.connect()
	.then((client) => {
		databaseModule.setDB(client.db(process.env.DB_NAME));
	})
	.catch((err) => {
		console.log('Database connection error  - database/connect.js', err);
	});
