const { findPath, checkIfExist, gFile, appendToFile, formatFile } = require('@rigel/utils');
const { compile } = require('handlebars');
const jetpack = require('fs-jetpack');
const ora = require('ora');
const shell = require('shelljs');
const PrettyError = require('pretty-error');

const { actionRnSource } = require('./templates/action.temp');

const pe = new PrettyError();

exports.addAction = async (name, types, path) => {
	const sourcetemplate = compile(actionRnSource);
	const content = sourcetemplate({ name, date: new Date(), type: types[0] });
	gFile({ path: `${path}`, name, type: 'action', content });
	const { path: actionsIndexPath } = findPath(`redux/index.actions.js`);
	await appendToFile(actionsIndexPath, [ ';', '' ], `export { ${name} } from './${name}/${name}.action'`);
	await formatFile(actionsIndexPath);
};
