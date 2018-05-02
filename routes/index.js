var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
let filePath = path.join('.', 'dogs.txt');

router.get('/', (req, res, next) => {
	let readStream = fs.createReadStream(filePath);
	let data = [];
	readStream.on('data', (text) => {
		let names = text.toString('utf8').split('\n');
		for (let i = 0; i < names.length; i++) {
			if (names[i].length > 0) {
				data.push(names[i]);
			}
		}
	});
	readStream.on('end', () => {
		res.status(200).send(data);
	})
});

router.post('/:name', (req, res, next) => {
	fs.appendFile(filePath, req.params.name + '\n', () => {
		res.status(200).send({ success: true });
	});
});

module.exports = router;

