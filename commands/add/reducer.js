const { findPath, checkIfExist, gFile, appendToFile, formatFile } = require('../../utils/index');
const { compile } = require('handlebars');
const jetpack = require('fs-jetpack');
const ora = require('ora');
const shell = require('shelljs');
const PrettyError = require('pretty-error');

const { reducerRnSource } = require('./templates/reducer.temp');

const pe = new PrettyError();

exports.addReducer = async (name, types, path) => {
	const sourcetemplate = compile(reducerRnSource);
	const content = sourcetemplate({
		name,
		date: new Date(),
		type1: types[0],
		type2: types[1],
		type3: types[2]
	});
	gFile({ path: `${path}`, name, type: 'reducer', content });
	const { path: reducerIndexPath } = findPath(`states/index.reducers.js`);
	await appendToFile(reducerIndexPath, [ 'combineReducers({' ], `${String(name).toLowerCase()},`);
	await appendToFile(
		reducerIndexPath,
		[ ';' ],
		`import ${String(name).toLowerCase()} from './${name}/${name}.reducer'`
	);
	await formatFile(reducerIndexPath);
};
