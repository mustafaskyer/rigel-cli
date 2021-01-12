const { findPath, checkIfExist, gFile, appendToFile, formatFile } = require('@rigel/utils');
const { compile } = require('handlebars');

const { typesRnSource } = require('./templates/types.temp');

exports.addTypes = async (name, types, path) => {
	const sourcetemplate = compile(typesRnSource);
	const content = sourcetemplate({ name: name.toUpperCase(), date: new Date() });
	gFile({ path: `${path}`, name, type: 'types', content });
	const { path: typesIndexPath } = findPath(`states/index.types.js`);
	await appendToFile(
		typesIndexPath,
		[ ';', '' ],
		`export { ${types[0]}, ${types[1]}, ${types[2]} } from './${name}/${name}.types'`
	);
	await formatFile(typesIndexPath);
};
