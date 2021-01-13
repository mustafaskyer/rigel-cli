const { findPath, checkIfExist, gFile, appendToFile, formatFile } = require('@mustafaskyer/rigel-utils');
const { compile } = require('handlebars');

const { selectorRnSource } = require('./templates/selector.temp');

exports.addSelector = async (name, path) => {
	const sourcetemplate = compile(selectorRnSource);
	const content = sourcetemplate({ name, date: new Date() });
	gFile({ path: `${path}`, name, type: 'selector', content });
	const { path: selectorsIndexPath } = findPath(`states/index.selectors.js`);
	await appendToFile(selectorsIndexPath, [ ';', '' ], `export { ${name} } from './${name}/${name}.selector'`);
	await formatFile(selectorsIndexPath);
};
