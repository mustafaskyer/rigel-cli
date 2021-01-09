const fs = require('fs');
const { prompt } = require('./inqurier.util');
const { resolve } = require('path');
const { reject } = require('lodash');
const ls = async (path) => {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			if (err) {
				reject('Unable to scan directory: ' + err);
			}
			resolve(files);
		});
	});
};

const getLsAnswers = async ({ path, name, type }) => {
	return new Promise(async (resolve, reject) => {
		const filesList = await ls(path);
		const filteredFiles = filesList.map((f) => f.replace(`.${type}`, '').replace('.js', ''));
		const answers = await prompt({ options: filteredFiles, message: 'select|search componets to import', name });
		resolve(answers);
	});
};

module.exports = { ls, getLsAnswers };
