const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'public/memes');
	},
	filename: (req, file, callback) => {
		const name = new Date().getTime();
		const extension = file.originalname?.split('.').pop() || '.jpg';
		callback(null, `${name}.${extension}`);
	},
});

const filters = (req, file, callback) => {
	const isImage = file.mimetype.startsWith('image/');
	callback(null, isImage);
};

const archivo = multer({ storage: storage, fileFilter: filters });

module.exports = archivo;
